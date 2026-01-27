import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// POST create booking
router.post('/', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Validate required fields
    if (!bookingData.customer || !bookingData.customer.fullName || !bookingData.customer.email) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and email are required'
      });
    }

    if (!bookingData.dates || !bookingData.dates.startDate || !bookingData.dates.endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start and end dates are required'
      });
    }

    if (!bookingData.pricing || !bookingData.pricing.totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'Pricing information is required'
      });
    }

    // Calculate duration if not provided
    if (!bookingData.dates.duration) {
      const start = new Date(bookingData.dates.startDate);
      const end = new Date(bookingData.dates.endDate);
      const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      bookingData.dates.duration = duration;
    }

    const booking = new Booking(bookingData);
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        bookingId: booking.bookingId,
        customer: booking.customer,
        dates: booking.dates,
        pricing: booking.pricing,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('❌ Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking'
    });
  }
});

// GET booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('❌ Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking'
    });
  }
});

// GET bookings by email
router.get('/customer/:email', async (req, res) => {
  try {
    const bookings = await Booking.find({ 
      'customer.email': req.params.email 
    })
    .sort('-createdAt')
    .select('-__v')
    .lean();

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('❌ Get bookings by email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

export default router;