import express from 'express';
import { applyToJob, getApplicantsForJob } from '../controllers/application.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

// Students apply to a job
router.post('/', verifyToken, requireRole('student'), applyToJob);

// TPO views all applicants for a job
router.get('/:jobId', verifyToken, requireRole('tpo'), getApplicantsForJob);

export default router;
