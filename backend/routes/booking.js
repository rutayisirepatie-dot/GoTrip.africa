import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
  getBookingStats
} from '../controllers/bookingController.js';

const router = express.Router();

// User routes
router.post('/', authMiddleware, createBooking);
router.get('/user', authMiddleware, getUserBookings);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, getAllBookings);
router.patch('/:id/status', authMiddleware, adminMiddleware, updateBookingStatus);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBooking);
router.get('/stats', authMiddleware, adminMiddleware, getBookingStats);

export default router;