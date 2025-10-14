import { Router, Request } from 'express';
import submitController from '../controllers/submitManuscript.controller';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { rateLimiter } from '../../middleware/auth.middleware';

const router = Router();

const getUploadsPath = (): string => {
  if (process.env.NODE_ENV === 'production') {
    // Go up to dist/ and then to uploads/documents
    return path.join(__dirname, '..', '..', 'uploads', 'documents');
  } else {
    // In development, use the existing path
    return path.join(process.cwd(), 'src', 'uploads', 'documents');
  }
};

// Configure multer for single file uploads
const storage = multer.diskStorage({
  destination: function (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, getUploadsPath());
  },
  filename: function (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    // Create a unique filename to prevent overwrites
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    cb(
      null,
      `${path.basename(file.originalname, extension)}-${uniqueSuffix}${extension}`
    );
  },
});

// Filter for PDF files only
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF files are allowed.'));
  }
};

// Initialize multer with the storage, file filter, and size limits
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for manuscripts
});

// Middleware for handling the single manuscript file upload
const manuscriptUpload = upload.single('manuscriptFile');

// Apply rate limiting to the submission endpoint
const submissionRateLimiter = rateLimiter(10, 60 * 60 * 1000); // 10 requests per hour

// Route for submitting a new manuscript
router.post(
  '/manuscript',
  submissionRateLimiter,
  manuscriptUpload,
  submitController.submitManuscript
);

// Route for revising a manuscript
router.post(
  '/manuscript/:id/revise',
  submissionRateLimiter,
  manuscriptUpload,
  submitController.reviseManuscript
);

export default router;
