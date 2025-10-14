import nodemailer, { Transporter } from 'nodemailer';
import logger from '../utils/logger';
import validateEnv from '../utils/validateEnv';
import { ManuscriptStatus } from '../Manuscript_Submission/models/manuscript.model';
import { FullProposalStatus } from '../researchers/models/fullProposal.model';
import {
  reviewReminderTemplate,
  overdueReviewTemplate,
  reconciliationAssignmentTemplate,
  reviewAssignmentTemplate,
  manuscriptNotificationTemplate,
  submissionConfirmationTemplate,
  statusUpdateTemplate,
  reviewerInvitationTemplate,
  reviewerCredentialsTemplate,
  invitationTemplate,
  credentialsTemplate,
  aiReviewFailureTemplate,
  manuscriptStatusUpdateTemplate,
  proposalArchiveNotificationTemplate,
} from '../templates/emails';
import { fullProposalStatusUpdateTemplate } from '../templates/emails/fullProposalStatusUpdateTemplate';

validateEnv();

class EmailService {
  private transporter: Transporter;
  private frontendUrl: string;
  private emailFrom: string;

  constructor() {
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      throw new Error(
        'SMTP configuration must be defined in environment variables'
      );
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    this.frontendUrl = process.env.FRONTEND_URL || '';
    this.emailFrom = process.env.EMAIL_FROM || '';

    if (!this.frontendUrl || !this.emailFrom) {
      throw new Error(
        'FRONTEND_URL and EMAIL_FROM must be defined in environment variables'
      );
    }
  }

  private getManuscriptStatusUpdateSubject(
    status: ManuscriptStatus,
    manuscriptTitle: string
  ): string {
    if (status === ManuscriptStatus.APPROVED) {
      return `Congratulations! Your Manuscript "${manuscriptTitle}" Has Been Accepted`;
    } else if (status === ManuscriptStatus.REJECTED) {
      return `Update on Your Manuscript Submission: Decision Made for "${manuscriptTitle}"`;
    } else {
      return `Update on your Manuscript Submission: ${manuscriptTitle}`;
    }
  }

  private getFullProposalStatusUpdateSubject(
    status: any,
    manuscriptTitle: string
  ): string {
    if (status === FullProposalStatus.APPROVED) {
      return `Congratulations! Your Full Manuscript "${manuscriptTitle}" Has Been Shortlisted and Approved`;
    } else if (status === FullProposalStatus.REJECTED) {
      return `Update on Your Manuscript Submission: Decision Made for "${manuscriptTitle}"`;
    } else {
      return `Update on your Manuscript Submission: ${manuscriptTitle}`;
    }
  }

  async sendAiReviewFailureEmail(
    to: string,
    manuscriptId: string,
    errorMessage: string
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: to,
        subject: `AI Review Generation Failed for Manuscript ${manuscriptId}`,
        html: aiReviewFailureTemplate(manuscriptId, errorMessage),
      });
      logger.info(
        `AI review failure email sent to: ${to} for manuscript ${manuscriptId}`
      );
    } catch (error) {
      logger.error(
        `Failed to send AI review failure email to ${to} for manuscript ${manuscriptId}:`,
        error instanceof Error ? error.message : 'Unknown error'
      );
      throw error;
    }
  }

  async sendManuscriptStatusUpdateEmail(
    to: string,
    name: string,
    projectTitle: string,
    status: ManuscriptStatus,
    fundingAmount?: number,
    feedbackComments?: string
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: to,
        subject: this.getManuscriptStatusUpdateSubject(status, projectTitle),
        html: manuscriptStatusUpdateTemplate(
          name,
          projectTitle,
          status,
          fundingAmount,
          feedbackComments
        ),
      });
      logger.info(
        `Manuscript status update email sent to: ${to} for manuscript ${projectTitle}`
      );
    } catch (error) {
      logger.error(
        `Failed to send manuscript status update email to ${to} for manuscript ${projectTitle}:`,
        error instanceof Error ? error.message : 'Unknown error'
      );
      throw error;
    }
  }

  async sendFullProposalStatusUpdateEmail(
    to: string,
    name: string,
    projectTitle: string,
    status: any,
    feedbackComments?: string
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: to,
        subject: this.getFullProposalStatusUpdateSubject(status, projectTitle),
        html: fullProposalStatusUpdateTemplate(
          name,
          projectTitle,
          status,
          feedbackComments
        ),
      });
      logger.info(
        `Full manuscript status update email sent to: ${to} for manuscript ${projectTitle}`
      );
    } catch (error) {
      logger.error(
        `Failed to send full manuscript status update email to ${to} for manuscript ${projectTitle}:`,
        error instanceof Error ? error.message : 'Unknown error'
      );
      throw error;
    }
  }

  async sendProposalArchiveNotificationEmail(
    to: string,
    name: string,
    projectTitle: string,
    isArchived: boolean,
    comment?: string
  ): Promise<void> {
    const subject = isArchived
      ? `Your Manuscript "${projectTitle}" Has Been Archived`
      : `Your Manuscript "${projectTitle}" Has Been Unarchived`;
    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: to,
        subject: subject,
        html: proposalArchiveNotificationTemplate(
          name,
          projectTitle,
          isArchived,
          comment
        ),
      });
      logger.info(
        `${isArchived ? 'Archive' : 'Unarchive'} notification email sent to: ${to} for manuscript ${projectTitle}`
      );
    } catch (error) {
      logger.error(
        `Failed to send ${isArchived ? 'archive' : 'unarchive'} notification email to ${to} for manuscript ${projectTitle}:`,
        error instanceof Error ? error.message : 'Unknown error'
      );
      throw error;
    }
  }

  async sendManuscriptNotificationEmail(
    reviewerEmails: string | string[],
    author: string,
    manuscriptTitle: string
  ): Promise<void> {
    const reviewUrl = `${this.frontendUrl}/admin/manuscripts`;

    // Handle comma-separated emails or single email
    const recipients = Array.isArray(reviewerEmails)
      ? reviewerEmails
      : reviewerEmails.split(',').map((email) => email.trim());

    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: recipients.join(','),
        subject: `New Manuscript Submission by ${author}`,
        html: manuscriptNotificationTemplate(
          author,
          manuscriptTitle,
          reviewUrl
        ),
      });
      logger.info(
        `Manuscript notification email sent to reviewers: ${recipients.join(', ')}`
      );
    } catch (error) {
      logger.error(
        'Failed to send manuscript notification email:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async sendSubmissionConfirmationEmail(
    email: string,
    name: string,
    manuscriptTitle: string,
    isRevision = false
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: email,
        subject: isRevision
          ? 'Manuscript Revision Confirmation'
          : 'Manuscript Submission Confirmation',
        html: submissionConfirmationTemplate(name, manuscriptTitle, isRevision),
      });
      logger.info(`Submission confirmation email sent to ${email}`);
    } catch (error) {
      logger.error(
        'Failed to send submission confirmation email:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async sendReviewerInvitationEmail(
    email: string,
    token: string
  ): Promise<void> {
    const inviteUrl = `${this.frontendUrl}/accept-invitation/${token}`;

    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: email,
        subject: 'Invitation to join as a Manuscript Reviewer',
        html: reviewerInvitationTemplate(inviteUrl),
      });
      logger.info(`Reviewer invitation email sent to: ${email}`);
    } catch (error) {
      logger.error(
        'Failed to send reviewer invitation email:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async sendReviewerCredentialsEmail(
    email: string,
    password: string
  ): Promise<void> {
    const loginUrl = `${this.frontendUrl}/reviewers/login`;

    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: email,
        subject: 'Your Manuscript Reviewer Account Credentials',
        html: reviewerCredentialsTemplate(email, password, loginUrl),
      });
      logger.info(`Reviewer credentials email sent to: ${email}`);
    } catch (error) {
      logger.error(
        'Failed to send reviewer credentials email:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async sendReviewAssignmentEmail(
    email: string,
    manuscriptTitle: string,
    authorName: string,
    dueDate: Date
  ): Promise<void> {
    const reviewUrl = `${this.frontendUrl}/reviewers/assignments`;

    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: email,
        subject: 'New Manuscript Assignment',
        html: reviewAssignmentTemplate(
          manuscriptTitle,
          authorName,
          reviewUrl,
          dueDate
        ),
      });
      logger.info(`Review assignment email sent to reviewer: ${email}`);
    } catch (error) {
      logger.error(
        'Failed to send review assignment email:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async sendInvitationEmail(email: string, token: string): Promise<void> {
    const inviteUrl = `${this.frontendUrl}/author-register/${token}`;

    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: email,
        subject: 'Invitation to join the Author Portal',
        html: invitationTemplate(inviteUrl),
      });
      logger.info(`Invitation email sent to: ${email}`);
    } catch (error) {
      logger.error(
        'Failed to send invitation email:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async sendCredentialsEmail(email: string, password: string): Promise<void> {
    const loginUrl = `${this.frontendUrl}/authors/login`;

    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: email,
        subject: 'Your Author Portal Account Credentials',
        html: credentialsTemplate(email, password, loginUrl),
      });
      logger.info(`Credentials email sent to: ${email}`);
    } catch (error) {
      logger.error(
        'Failed to send credentials email:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async sendReviewReminderEmail(
    email: string,
    reviewerName: string,
    manuscriptTitle: string,
    dueDate: Date
  ): Promise<void> {
    const reviewUrl = `${this.frontendUrl}/reviewers/dashboard`;

    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: email,
        subject: 'Reminder: Manuscript Review Due Soon',
        html: reviewReminderTemplate(
          reviewerName,
          manuscriptTitle,
          reviewUrl,
          dueDate
        ),
      });
      logger.info(`Review reminder email sent to: ${email}`);
    } catch (error) {
      logger.error(
        'Failed to send review reminder email:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async sendOverdueReviewNotification(
    email: string,
    reviewerName: string,
    manuscriptTitle: string
  ): Promise<void> {
    const reviewUrl = `${this.frontendUrl}/reviewers/dashboard`;

    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: email,
        subject: 'OVERDUE: Manuscript Review',
        html: overdueReviewTemplate(reviewerName, manuscriptTitle, reviewUrl),
      });
      logger.info(`Overdue review notification sent to: ${email}`);
    } catch (error) {
      logger.error(
        'Failed to send overdue review notification:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  async sendReconciliationAssignmentEmail(
    email: string,
    reviewerName: string,
    manuscriptTitle: string,
    dueDate: Date,
    reviewCount: number,
    averageScore: number,
    scores: number[]
  ): Promise<void> {
    const reviewUrl = `${this.frontendUrl}/reviewers/dashboard`;

    try {
      await this.transporter.sendMail({
        from: this.emailFrom,
        to: email,
        subject: 'Reconciliation Review Assignment',
        html: reconciliationAssignmentTemplate(
          reviewerName,
          manuscriptTitle,
          reviewUrl,
          dueDate,
          reviewCount,
          averageScore,
          scores
        ),
      });
      logger.info(`Reconciliation assignment email sent to: ${email}`);
    } catch (error) {
      logger.error(
        'Failed to send reconciliation assignment email:',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
}

export default new EmailService();
