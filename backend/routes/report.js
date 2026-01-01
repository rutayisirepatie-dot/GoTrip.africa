// backend/routes/reportRoutes.js
import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  generateRevenueReport,
  generateUserReport,
  generateBookingReport,
  generateCustomReport,
  generateReportFile
} from '../controllers/reportController.js';

const router = express.Router();

// All routes require authentication and admin access
router.use(protect);
router.use(authorize('admin'));

router.get('/revenue', generateRevenueReport);
router.get('/users', generateUserReport);
router.get('/bookings', generateBookingReport);
router.post('/custom', generateCustomReport);
router.post('/download/:type', generateReportFile);

export default router;