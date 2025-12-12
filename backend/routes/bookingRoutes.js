const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/auth');

// Submit booking
router.post('/submit', async (req, res) => {
  try {
    const {
      service_type,
      service_id,
      service_name,
      service_price,
      name,
      email,
      phone,
      start_date,
      duration,
      location,
      group_size,
      message,
      total_price,
      userId,
      userName,
      checkin,
      checkout,
      guests,
      rooms,
      room_type,
      package
    } = req.body;
    
    // Calculate daily rate from service price
    let dailyRate = 0;
    const priceMatch = service_price.match(/\$(\d+)/);
    if (priceMatch) {
      dailyRate = parseInt(priceMatch[1]);
    } else if (service_type === 'guide') {
      dailyRate = 150;
    } else if (service_type === 'translator') {
      dailyRate = 120;
    } else if (service_type === 'accommodation') {
      dailyRate = 200;
    } else {
      dailyRate = 100;
    }
    
    // Calculate total price if not provided
    let calculatedTotalPrice = total_price;
    if (!calculatedTotalPrice && duration) {
      calculatedTotalPrice = dailyRate * parseInt(duration);
    }
    
    // Create booking
    const booking = new Booking({
      serviceType: service_type,
      serviceId: service_id,
      serviceName: service_name,
      servicePrice: service_price,
      dailyRate,
      totalPrice: calculatedTotalPrice,
      
      // User info
      userId: userId || null,
      userName: userName || name,
      email,
      phone,
      
      // Booking details
      startDate: new Date(start_date),
      duration: parseInt(duration) || 1,
      location,
      groupSize: group_size,
      message: message || '',
      
      // Accommodation specific
      checkin: checkin ? new Date(checkin) : null,
      checkout: checkout ? new Date(checkout) : null,
      guests: guests || 1,
      rooms: rooms || 1,
      roomType: room_type || 'standard',
      
      // Destination specific
      packageType: package,
      
      // Analytics
      source: req.get('origin') || 'website',
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });
    
    await booking.save();
    
    res.status(201).json({
      success: true,
      message: 'Booking submitted successfully!',
      data: booking
    });
    
  } catch (error) {
    console.error('Booking submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit booking. Please try again.',
      error: error.message
    });
  }
});

// Get user's bookings
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: bookings
    });
    
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get all bookings (admin only)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }
    
    const { status, serviceType, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = {};
    if (status) query.status = status;
    if (serviceType) query.serviceType = serviceType;
    
    const bookings = await Booking.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Booking.countDocuments(query);
    
    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update booking status
router.patch('/update/:id', authMiddleware, async (req, res) => {
  try {
    const { status, paymentStatus, adminNotes } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Check permissions
    const isAdmin = req.user.role === 'admin';
    const isOwner = booking.userId && booking.userId.toString() === req.user.userId;
    
    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    // Update fields
    if (status && (isAdmin || status === 'cancelled')) {
      booking.status = status;
      
      if (status === 'cancelled') {
        booking.cancelledAt = new Date();
      }
    }
    
    if (paymentStatus && isAdmin) {
      booking.paymentStatus = paymentStatus;
      if (paymentStatus === 'paid') {
        booking.paymentDate = new Date();
      }
    }
    
    if (adminNotes && isAdmin) {
      booking.adminNotes.push({
        content: adminNotes,
        createdBy: req.user.userId
      });
    }
    
    await booking.save();
    
    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
    
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get booking statistics
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }
    
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    
    const revenueByService = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: '$serviceType', total: { $sum: '$totalPrice' } } }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
        revenueByService
      }
    });
    
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;