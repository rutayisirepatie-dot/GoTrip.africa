// backend/routes/booking.js
import express from 'express';
import { Booking } from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// ======================
// CREATE BOOKING (any authenticated user)
// ======================
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      service_type,
      service_id,
      service_name,
      date,
      duration,
      travelers,
      total_amount,
      notes
    } = req.body;

    // Validate required fields
    if (!service_type || !service_name) {
      return res.status(400).json({
        success: false,
        message: 'service_type and service_name are required'
      });
    }

    const bookingDate = new Date(date);
    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid date' });
    }

    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid duration' });
    }

    const travelersNum = parseInt(travelers);
    if (isNaN(travelersNum) || travelersNum <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid travelers number' });
    }

    const totalAmountNum = parseFloat(total_amount);
    if (isNaN(totalAmountNum) || totalAmountNum <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid totalAmount' });
    }

    // Generate booking reference
    const bookingReference = `BOOK-${Date.now().toString().slice(-6)}`;

    const booking = new Booking({
      user: req.user._id,
      userName: req.user.name,
      userEmail: req.user.email,
      serviceType: service_type,
      serviceId: service_id,
      serviceName: service_name,
      bookingReference,
      date: bookingDate,
      duration: durationNum,
      travelers: travelersNum,
      totalAmount: totalAmountNum,
      notes,
      status: 'pending',
      paymentStatus: 'pending'
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
});

// ======================
// GET ALL BOOKINGS (ADMIN ONLY)
// ======================
router.get('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: error.message });
  }
});

// ======================
// GET USER BOOKINGS
// ======================
router.get('/my', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: error.message });
  }
});

// ======================
// UPDATE BOOKING STATUS (ADMIN ONLY)
// ======================
router.put('/:id/status', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: 'Booking status updated', data: booking });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update booking', error: error.message });
  }
});

// ======================
// UPDATE BOOKING (USER OR ADMIN)
// ======================
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    // Allow admin or booking owner to update
    if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this booking' });
    }

    // Validate and update allowed fields
    const allowedFields = ['serviceType', 'serviceId', 'serviceName', 'date', 'duration', 'travelers', 'totalAmount', 'notes', 'status', 'paymentStatus'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        // Additional validation
        if (field === 'date') {
          const dateValue = new Date(req.body[field]);
          if (isNaN(dateValue.getTime())) throw new Error('Invalid date');
          booking[field] = dateValue;
        } else if (field === 'duration' || field === 'travelers') {
          const num = parseInt(req.body[field]);
          if (isNaN(num) || num <= 0) throw new Error(`Invalid ${field}`);
          booking[field] = num;
        } else if (field === 'totalAmount') {
          const num = parseFloat(req.body[field]);
          if (isNaN(num) || num <= 0) throw new Error('Invalid totalAmount');
          booking[field] = num;
        } else {
          booking[field] = req.body[field];
        }
      }
    });

    await booking.save();
    res.json({ success: true, message: 'Booking updated successfully', data: booking });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to update booking', error: error.message });
  }
});

// ======================
// DELETE BOOKING (USER OR ADMIN)
// ======================
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    // Allow admin or booking owner to delete
    if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this booking' });
    }

    await booking.remove();
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete booking', error: error.message });
  }
});

export default router;