import express from 'express';
import authorController from '../controllers/author.controller';
import {
  rateLimiter,
  authenticateResearcherToken,
  authenticateAdminToken,
} from '../../middleware/auth.middleware';
import validateRequest from '../../middleware/validateRequest';
import { z } from 'zod';

const router = express.Router();

// Validation schemas
const inviteAuthorSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address'),
  }),
});

const completeProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    faculty: z.string().min(1, 'Faculty is required'),
    affiliation: z.string().min(1, 'Affiliation is required'),
    orcid: z.string().optional(),
  }),
  params: z.object({
    token: z.string().min(1, 'Token is required'),
  }),
});

const addAuthorSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    faculty: z.string().min(1, 'Faculty is required'),
    affiliation: z.string().min(1, 'Affiliation is required'),
    orcid: z.string().optional(),
  }),
});

// Admin routes for author management
router.post(
  '/invite',
  authenticateAdminToken,
  validateRequest(inviteAuthorSchema),
  authorController.inviteAuthor
);

router.post(
  '/add',
  authenticateAdminToken,
  validateRequest(addAuthorSchema),
  authorController.addAuthorProfile
);

router.get(
  '/invitations',
  authenticateAdminToken,
  authorController.getAuthorInvitations
);

router.delete('/:id', authenticateAdminToken, authorController.deleteAuthor);

router.post(
  '/:id/resend-invitation',
  authenticateAdminToken,
  authorController.resendAuthorInvitation
);

// Public route for profile completion
router.post(
  '/complete-profile/:token',
  validateRequest(completeProfileSchema),
  authorController.completeAuthorProfile
);

// Apply rate limiting to all researcher endpoints
const researcherRateLimiter = rateLimiter(50, 60 * 60 * 1000); // 50 requests per hour

// Protect all routes with researcher authentication
router.use(authenticateResearcherToken);
router.use(researcherRateLimiter);

// Dashboard route
router.get('/dashboard', authorController.getAuthorDashboard);

// Get specific manuscript details
router.get(
  '/manuscripts/:manuscriptId',
  authorController.getManuscriptDetails
);

export default router;
