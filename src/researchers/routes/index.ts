import { Router } from 'express';
import authorRoutes from './author.routes';
import fullProposalRoutes from './submitFullProposal.routes';

const router = Router();

router.use('/author', authorRoutes);
router.use('/', fullProposalRoutes);

export default router;
