// routes/user.js
import express from 'express';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import TripPlan from '../models/TripPlan.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Get user dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Get user bookings
    const bookings = await Booking.find({ userId });
    
    // Get user trip plans
    const tripPlans = await TripPlan.find({ userId });
    
    // Calculate stats
    const totalBookings = bookings.length;
    const upcomingBookings = bookings.filter(b => 
      ['confirmed', 'pending'].includes(b.status)
    ).length;
    const completedBookings = bookings.filter(b => 
      b.status === 'completed'
    ).length;
    const totalSpent = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    const stats = {
      totalBookings,
      upcomingBookings,
      completedBookings,
      totalSpent
    };

    res.json({
      success: true,
      data: {
        stats,
        recentBookings: bookings.slice(-3).reverse(),
        recentTripPlans: tripPlans.slice(-2).reverse()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user bookings
router.get('/bookings', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user trip plans
router.get('/trip-plans', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const tripPlans = await TripPlan.find({ userId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: tripPlans
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;