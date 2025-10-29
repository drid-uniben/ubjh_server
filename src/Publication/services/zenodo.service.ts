import axios from 'axios';
import fs from 'fs';
import logger from '../../utils/logger';
import { IArticle } from '../../Articles/model/article.model';

interface ZenodoDeposition {
  id: number;
  links: {
    bucket: string;
    publish: string;
    self: string;
  };
  metadata: any;
  state: string;
}

interface ZenodoMetadata {
  title: string;
  upload_type: string;
  publication_type: string;
  description: string;
  creators: Array<{
    name: string;
    affiliation: string;
    orcid?: string;
  }>;
  keywords: string[];
  access_right: string;
  license: string;
  publication_date: string;
  related_identifiers?: Array<{
    identifier: string;
    relation: string;
    resource_type: string;
  }>;
}

class ZenodoService {
  private baseUrl: string;
  private accessToken: string;

  constructor() {
    const isSandbox = process.env.ZENODO_SANDBOX === 'true';
    this.baseUrl = isSandbox
      ? 'https://sandbox.zenodo.org/api'
      : 'https://zenodo.org/api';
    this.accessToken = process.env.ZENODO_ACCESS_TOKEN || '';

    if (!this.accessToken) {
      logger.warn('ZENODO_ACCESS_TOKEN not set in environment variables');
    }
  }

  /**
   * Create a new deposition draft
   */
  async createDeposition(): Promise<ZenodoDeposition> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/deposit/depositions`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      logger.info(`Created Zenodo deposition: ${response.data.id}`);
      return response.data;
    } catch (error: any) {
      logger.error('Failed to create Zenodo deposition:', error.message);
      throw new Error(`Zenodo deposition creation failed: ${error.message}`);
    }
  }

  /**
   * Upload PDF file to deposition bucket
   */
  async uploadFile(
    bucketUrl: string,
    filePath: string,
    filename: string
  ): Promise<void> {
    try {
      const fileStream = fs.createReadStream(filePath);

      await axios.put(`${bucketUrl}/${filename}`, fileStream, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/pdf',
        },
      });

      logger.info(`Uploaded file to Zenodo: ${filename}`);
    } catch (error: any) {
      logger.error('Failed to upload file to Zenodo:', error.message);
      throw new Error(`Zenodo file upload failed: ${error.message}`);
    }
  }

  /**
   * Build metadata for the article
   */
  buildMetadata(article: IArticle, authors: any[]): ZenodoMetadata {
    const metadata: ZenodoMetadata = {
      title: article.title,
      upload_type: 'publication',
      publication_type: 'article',
      description: article.abstract,
      creators: authors.map((author) => ({
        name: author.name,
        affiliation: author.affiliation || 'University of Benin',
        orcid: author.orcid,
      })),
      keywords: article.keywords,
      access_right: 'open',
      license: 'cc-by-4.0',
      publication_date: article.publishDate.toISOString().split('T')[0],
    };

    return metadata;
  }

  /**
   * Update deposition metadata
   */
  async updateMetadata(
    depositionId: number,
    metadata: ZenodoMetadata
  ): Promise<void> {
    try {
      await axios.put(
        `${this.baseUrl}/deposit/depositions/${depositionId}`,
        { metadata },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      logger.info(`Updated Zenodo metadata for deposition: ${depositionId}`);
    } catch (error: any) {
      logger.error('Failed to update Zenodo metadata:', error.message);
      throw new Error(`Zenodo metadata update failed: ${error.message}`);
    }
  }

  /**
   * Publish the deposition and get DOI
   */
  async publishDeposition(depositionId: number): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/deposit/depositions/${depositionId}/actions/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      const doi = response.data.doi;
      logger.info(`Published Zenodo deposition ${depositionId}, DOI: ${doi}`);

      return doi;
    } catch (error: any) {
      logger.error('Failed to publish Zenodo deposition:', error.message);
      throw new Error(`Zenodo publication failed: ${error.message}`);
    }
  }

  /**
   * Complete workflow: Create, upload, add metadata, and publish
   */
  async registerArticle(
    article: IArticle,
    authors: any[],
    pdfPath: string
  ): Promise<{ doi: string; depositionId: number; recordId: number }> {
    try {
      // Step 1: Create deposition
      const deposition = await this.createDeposition();

      // Step 2: Upload PDF
      const filename = `article_${article._id}.pdf`;
      await this.uploadFile(deposition.links.bucket, pdfPath, filename);

      // Step 3: Update metadata
      const metadata = this.buildMetadata(article, authors);
      await this.updateMetadata(deposition.id, metadata);

      // Step 4: Publish and get DOI
      const doi = await this.publishDeposition(deposition.id);

      return {
        doi,
        depositionId: deposition.id,
        recordId: deposition.id, // In Zenodo, record ID is same as deposition ID after publishing
      };
    } catch (error: any) {
      logger.error('Zenodo article registration failed:', error.message);
      throw error;
    }
  }
}

export default new ZenodoService();
