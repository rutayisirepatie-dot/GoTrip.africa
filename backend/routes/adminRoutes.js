// backend/routes/adminRoutes.js
import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// User Management
router.get('/users/stats', adminController.getUserStats);
router.get('/users/activity', adminController.getUserActivity);

// Booking Management
router.get('/bookings/stats', adminController.getBookingStats);
router.get('/bookings/revenue', adminController.getRevenueStats);

// Service Management
router.get('/services/stats', adminController.getServiceStats);
router.get('/services/performance', adminController.getServicePerformance);

// Content Management
router.get('/content/stats', adminController.getContentStats);

// Reports
router.get('/reports/generate', adminController.generateReport);
router.get('/reports/sales', adminController.getSalesReport);
router.get('/reports/users', adminController.getUserReport);

// System Settings
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

// Email Templates
router.get('/email-templates', adminController.getEmailTemplates);
router.put('/email-templates/:id', adminController.updateEmailTemplate);

// Newsletter Management
router.get('/newsletter/stats', adminController.getNewsletterStats);
router.post('/newsletter/broadcast', adminController.broadcastNewsletter);

// Backup & Restore
router.post('/backup', adminController.createBackup);
router.get('/backup/list', adminController.listBackups);
router.post('/restore/:id', adminController.restoreBackup);

export default router;