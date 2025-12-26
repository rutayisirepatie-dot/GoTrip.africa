import express from 'express';
import Booking from '../models/bookingModel.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// CREATE booking (user)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, userId: req.user.id, userEmail: req.user.email });
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET all bookings (admin)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET bookings for logged-in user
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE booking status (admin)
router.patch('/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;