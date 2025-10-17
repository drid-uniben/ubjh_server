import express from 'express';
import adminController from '../controllers/admin.controller';
import {
  authenticateAdminToken,
  rateLimiter,
} from '../middleware/auth.middleware';
//import researcherManagementRoutes from '../researchers/routes/researcher-management.routes';
import assignReviewRoutes from '../Review_System/routes/assignReview.routes';
import reassignReviewRoutes from '../Review_System/routes/reAssignReviewers.routes';
import manuscriptReviewsRoutes from '../Review_System/routes/manuscriptReviews.routes';
import finalDecisionsRoutes from '../Review_System/routes/finalDecisions.routes';
import adminReviewRoutes from '../Review_System/routes/adminReview.routes';

const router = express.Router();

const adminRateLimiter = rateLimiter(2000, 60 * 60 * 1000);

router.get(
  '/manuscripts',
  authenticateAdminToken,
  adminRateLimiter,
  adminController.getAllManuscripts
);

router.get(
  '/manuscripts/:id',
  authenticateAdminToken,
  adminRateLimiter,
  adminController.getManuscriptById
);

router.get(
  '/statistics',
  authenticateAdminToken,
  adminRateLimiter,
  adminController.getManuscriptStatistics
);

router.get(
  '/faculties-with-manuscripts',
  authenticateAdminToken,
  adminRateLimiter,
  adminController.getFacultiesWithManuscripts
);

router.get(
  '/faculties/data',
  authenticateAdminToken,
  adminRateLimiter,
  adminController.getFacultyData
);

router.post(
  '/faculties/assign',
  authenticateAdminToken,
  adminRateLimiter,
  adminController.assignFaculty
);

//router.use('/researcher', researcherManagementRoutes);
router.use('/assign-review', assignReviewRoutes);
router.use('/reassign-review', reassignReviewRoutes);
router.use('/manuscript-reviews', manuscriptReviewsRoutes);
router.use('/decisions', finalDecisionsRoutes);
router.use('/reviews', adminReviewRoutes);

export default router;
