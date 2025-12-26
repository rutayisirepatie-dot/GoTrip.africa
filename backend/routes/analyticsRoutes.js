// routes/analyticsRoutes.js
import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  trackSession,
  trackPageView,
  trackEvent,
  getDashboardOverview,
  getRealtimeAnalytics,
  getPredictiveAnalytics,
  getCohortAnalysis
} from '../controllers/analyticsController.js';

const router = express.Router();

// Public tracking endpoints
router.post('/sessions', trackSession);
router.post('/pageviews', trackPageView);
router.post('/events', trackEvent);

// Protected analytics endpoints
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardOverview);
router.get('/realtime', getRealtimeAnalytics);
router.get('/predictive', getPredictiveAnalytics);
router.get('/cohorts', getCohortAnalysis);

export default router;