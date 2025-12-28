// routes/admin.js
import express from 'express';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import TripPlan from '../models/TripPlan.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to check admin access
const requireAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin dashboard stats
router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const activeBookings = await Booking.countDocuments({ 
      status: { $in: ['confirmed', 'pending'] } 
    });
    
    const confirmedBookings = await Booking.find({ status: 'confirmed' });
    const totalRevenue = confirmedBookings.reduce((sum, booking) => 
      sum + (booking.totalAmount || 0), 0
    );
    
    const pendingTripPlans = await TripPlan.countDocuments({ status: 'review' });
    
    const stats = {
      totalUsers,
      totalBookings,
      activeBookings,
      totalRevenue,
      pendingTripPlans
    };
    
    // Get recent users
    const recentUsers = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email');
    
    // Get monthly revenue
    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          status: 'confirmed',
          createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 }
    ]);
    
    // Format monthly revenue
    const formattedMonthlyRevenue = monthlyRevenue.map(item => ({
      month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
      revenue: item.revenue
    }));
    
    // Get recent activity
    const recentActivity = [
      ...(await User.find().sort({ createdAt: -1 }).limit(3)).map(user => ({
        type: 'user',
        id: user._id,
        name: user.name,
        email: user.email,
        action: 'registered',
        timestamp: user.createdAt
      })),
      ...(await Booking.find().sort({ createdAt: -1 }).limit(3)).map(booking => ({
        type: 'booking',
        id: booking._id,
        name: booking.serviceName,
        email: booking.userEmail,
        action: booking.status,
        timestamp: booking.createdAt
      })),
      ...(await TripPlan.find().sort({ createdAt: -1 }).limit(3)).map(trip => ({
        type: 'trip_plan',
        id: trip._id,
        name: trip.userName,
        email: trip.userEmail,
        action: 'requested',
        timestamp: trip.createdAt
      }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json({
      success: true,
      data: {
        stats,
        recentUsers,
        recentBookings,
        monthlyRevenue: formattedMonthlyRevenue,
        recentActivity
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all users
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all bookings
router.get('/bookings', requireAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');
    
    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update booking status
router.put('/bookings/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create a new user (admin only)
router.post('/users', requireAdmin, async (req, res) => {
  try {
    const { name, email, password, role, phone, country } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const user = new User({
      name,
      email,
      password,
      role: role || 'user',
      phone,
      country,
      status: 'active'
    });
    
    await user.save();
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user
router.put('/users/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Don't allow changing password through this endpoint
    if (updates.password) {
      delete updates.password;
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete user
router.delete('/users/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Don't allow deleting admin users
    const user = await User.findById(id);
    if (user && user.role === 'admin') {
      return res.status(400).json({ success: false, message: 'Cannot delete admin users' });
    }
    
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;