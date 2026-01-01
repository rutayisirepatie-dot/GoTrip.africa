// routes/analyticsRoutes.js
import express from 'express';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
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

// ======================
// Public tracking endpoints
// ======================
router.post('/sessions', trackSession);
router.post('/pageviews', trackPageView);
router.post('/events', trackEvent);

// ======================
// Protected analytics endpoints (admin only)
// ======================
router.use(authenticateToken, authorizeAdmin);

router.get('/dashboard', getDashboardOverview);
router.get('/realtime', getRealtimeAnalytics);
router.get('/predictive', getPredictiveAnalytics);
router.get('/cohorts', getCohortAnalysis);

export default router;