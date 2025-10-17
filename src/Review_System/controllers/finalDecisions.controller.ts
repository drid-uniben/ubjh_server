import { Request, Response } from 'express';
import Manuscript, {
  ManuscriptStatus,
} from '../../Manuscript_Submission/models/manuscript.model';
import Review, { ReviewStatus, ReviewType } from '../models/review.model';
import Article from '../../Articles/model/article.model';
import { NotFoundError, UnauthorizedError } from '../../utils/customErrors';
import asyncHandler from '../../utils/asyncHandler';
import logger from '../../utils/logger';
import emailService from '../../services/email.service';
import { IUser } from '../../model/user.model';

interface IAdminResponse {
  success: boolean;
  message?: string;
  data?: any;
  count?: number;
}

interface AdminAuthenticatedRequest extends Request {
  user: {
    id: string;
    role: string;
  };
}

class DecisionsController {
getManuscriptsForDecision = asyncHandler(
    async (req: Request, res: Response<IAdminResponse>): Promise<void> => {
      const user = (req as AdminAuthenticatedRequest).user;
      if (user.role !== 'admin') {
        throw new UnauthorizedError(
          'You do not have permission to access this resource'
        );
      }

      const manuscripts = await Manuscript.aggregate([
        {
          $lookup: {
            from: 'Reviews',
            localField: '_id',
            foreignField: 'manuscript',
            as: 'reviews',
          },
        },
        {
          $match: {
            $or: [
              {
                'reviews.reviewType': ReviewType.RECONCILIATION,
                'reviews.status': ReviewStatus.COMPLETED,
              },
              {
                $and: [
                  { 'reviews.reviewType': ReviewType.HUMAN },
                  { 'reviews.status': ReviewStatus.COMPLETED },
                  { 'reviews.1': { $exists: true } },
                ],
              },
            ],
            status: ManuscriptStatus.UNDER_REVIEW,
          },
        },
        {
          $unwind: '$reviews'
        },
        {
          $lookup: {
            from: 'Users',
            localField: 'reviews.reviewer',
            foreignField: '_id',
            as: 'reviews.reviewer',
          },
        },
        {
          $unwind: '$reviews.reviewer'
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            abstract: { $first: '$abstract' },
            keywords: { $first: '$keywords' },
            pdfFile: { $first: '$pdfFile' },
            submitter: { $first: '$submitter' },
            coAuthors: { $first: '$coAuthors' },
            status: { $first: '$status' },
            reviews: { $push: '$reviews' },
          },
        },
      ]);

      await Manuscript.populate(manuscripts, {path: 'submitter coAuthors', select: 'name email'});

      res.status(200).json({
        success: true,
        count: manuscripts.length,
        data: manuscripts,
      });
    }
  );

  updateManuscriptStatus = asyncHandler(
    async (req: Request, res: Response<IAdminResponse>): Promise<void> => {
      const user = (req as AdminAuthenticatedRequest).user;
      if (user.role !== 'admin') {
        throw new UnauthorizedError(
          'You do not have permission to access this resource'
        );
      }

      const { manuscriptId } = req.params;
      const { status, feedbackComments } = req.body;

      if (!Object.values(ManuscriptStatus).includes(status)) {
        res.status(400).json({ success: false, message: 'Invalid status' });
        return;
      }

      const manuscript = await Manuscript.findById(manuscriptId).populate(
        'submitter coAuthors'
      );

      if (!manuscript) {
        throw new NotFoundError('Manuscript not found');
      }

      manuscript.status = status;
      if (feedbackComments) {
        manuscript.reviewComments = {
          ...(manuscript.reviewComments || {}),
          commentsForAuthor: feedbackComments,
        };
      }

      if (status === ManuscriptStatus.APPROVED) {
        const newArticle = new Article({
          title: manuscript.title,
          abstract: manuscript.abstract,
          keywords: manuscript.keywords,
          pdfFile: manuscript.pdfFile,
          author: manuscript.submitter,
          coAuthors: manuscript.coAuthors,
          manuscriptId: manuscript._id,
          // Placeholder values for publication details
          doi: `10.xxxx/journal.v${new Date().getFullYear()}.${manuscript._id}`,
          volume: new Date().getFullYear(),
          issue: 1, 
        });
        await newArticle.save();
        logger.info(`New article created from manuscript ${manuscriptId}`);
      }

      await manuscript.save();

      const submitter = manuscript.submitter as any as IUser;

      try {
        await emailService.sendManuscriptStatusUpdateEmail(
          submitter.email,
          submitter.name,
          manuscript.title,
          manuscript.status
        );
      } catch (error) {
        logger.error(
          'Failed to send status update email:',
          error instanceof Error ? error.message : 'Unknown error'
        );
      }

      logger.info(
        `Admin ${user.id} updated status for manuscript ${manuscriptId} to ${status}`
      );

      res.status(200).json({
        success: true,
        message: 'Manuscript status updated successfully',
        data: manuscript,
      });
    }
  );
}

export default new DecisionsController();
