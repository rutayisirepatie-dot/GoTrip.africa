import express from 'express';
import {
  getUserDashboard,
  getAdminDashboard,
  getAllUsers,
  getAllBookings,
  updateBookingStatus,
  getUserBookings,
  updateUserProfile,
  updateUserByAdmin,
  cancelBooking
} from '../controllers/dashboardController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.get('/user', protect, getUserDashboard);
router.get('/user/bookings', protect, getUserBookings);
router.put('/user/profile', protect, updateUserProfile);
router.put('/bookings/:id/cancel', protect, cancelBooking);

// Admin routes
router.get('/admin', protect, authorize('admin'), getAdminDashboard);
router.get('/admin/users', protect, authorize('admin'), getAllUsers);
router.get('/admin/bookings', protect, authorize('admin'), getAllBookings);
router.put('/admin/bookings/:id', protect, authorize('admin'), updateBookingStatus);
router.put('/admin/users/:id', protect, authorize('admin'), updateUserByAdmin);

export default router;