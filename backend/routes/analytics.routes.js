import express from 'express';
import { getPlacementStats, getTopRecruiters } from '../controllers/analytics.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/stats', verifyToken, requireRole('tpo'), getPlacementStats);
router.get('/top-recruiters', verifyToken, requireRole('tpo'), getTopRecruiters);

export default router;
    