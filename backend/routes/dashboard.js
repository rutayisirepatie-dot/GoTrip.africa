// backend/routes/dashboard.js
import express from 'express';
import { User, Booking, TripPlan } from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// ==========================
// User Dashboard
// ==========================
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId });
    const tripPlans = await TripPlan.find({ user: userId });

    const totalBookings = bookings.length;
    const upcomingBookings = bookings.filter(b => ['confirmed', 'pending'].includes(b.status)).length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const totalSpent = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    const pendingTripPlans = tripPlans.filter(t => t.status === 'review').length;

    const recentBookings = bookings.slice(0, 5);
    const recentTripPlans = tripPlans.slice(0, 5);

    res.json({
      success: true,
      data: {
        stats: { totalBookings, upcomingBookings, completedBookings, totalSpent, pendingTripPlans },
        recentBookings,
        recentTripPlans
      }
    });
  } catch (error) {
    console.error('User dashboard error:', error);
    res.status(500).json({ success: false, message: 'Failed to load dashboard', error: error.message });
  }
});

// ==========================
// Admin Dashboard
// ==========================
router.get('/admin', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const activeBookings = await Booking.countDocuments({ status: { $in: ['confirmed', 'pending'] } });

    const totalRevenueAgg = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;
    const pendingTripPlans = await TripPlan.countDocuments({ status: 'review' });

    res.json({
      success: true,
      data: {
        stats: { totalUsers, totalBookings, activeBookings, totalRevenue, pendingTripPlans }
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ success: false, message: 'Failed to load admin dashboard', error: error.message });
  }
});

// ==========================
// CRUD: Users (admin)
// ==========================
router.get('/admin/users', authenticateToken, authorizeAdmin, async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ success: true, data: users });
});

router.get('/admin/user/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid user ID' });
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user', error: error.message });
  }
});

router.put('/admin/user/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid user ID' });
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
    if (!updated) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User updated', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update user', error: error.message });
  }
});

router.delete('/admin/user/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid user ID' });
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete user', error: error.message });
  }
});

// ==========================
// CRUD: Bookings (admin or owner)
// ==========================
router.get('/booking/:id', authenticateToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid booking ID' });
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    if (req.user._id.toString() !== booking.user.toString() && !req.user.isAdmin) return res.status(403).json({ success: false, message: 'Not authorized' });

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch booking', error: error.message });
  }
});

router.put('/booking/:id', authenticateToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid booking ID' });
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    if (req.user._id.toString() !== booking.user.toString() && !req.user.isAdmin) return res.status(403).json({ success: false, message: 'Not authorized' });

    Object.assign(booking, req.body);
    await booking.save();
    res.json({ success: true, message: 'Booking updated', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update booking', error: error.message });
  }
});

router.delete('/booking/:id', authenticateToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid booking ID' });
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    if (req.user._id.toString() !== booking.user.toString() && !req.user.isAdmin) return res.status(403).json({ success: false, message: 'Not authorized' });

    await booking.remove();
    res.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete booking', error: error.message });
  }
});

// ==========================
// CRUD: TripPlans (admin or owner)
// ==========================
router.get('/tripplan/:id', authenticateToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid trip plan ID' });
    const tripPlan = await TripPlan.findById(req.params.id);
    if (!tripPlan) return res.status(404).json({ success: false, message: 'Trip plan not found' });

    if (req.user._id.toString() !== tripPlan.user.toString() && !req.user.isAdmin) return res.status(403).json({ success: false, message: 'Not authorized' });

    res.json({ success: true, data: tripPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch trip plan', error: error.message });
  }
});

router.put('/tripplan/:id', authenticateToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid trip plan ID' });
    const tripPlan = await TripPlan.findById(req.params.id);
    if (!tripPlan) return res.status(404).json({ success: false, message: 'Trip plan not found' });

    if (req.user._id.toString() !== tripPlan.user.toString() && !req.user.isAdmin) return res.status(403).json({ success: false, message: 'Not authorized' });

    Object.assign(tripPlan, req.body);
    await tripPlan.save();
    res.json({ success: true, message: 'Trip plan updated', data: tripPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update trip plan', error: error.message });
  }
});

router.delete('/tripplan/:id', authenticateToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid trip plan ID' });
    const tripPlan = await TripPlan.findById(req.params.id);
    if (!tripPlan) return res.status(404).json({ success: false, message: 'Trip plan not found' });

    if (req.user._id.toString() !== tripPlan.user.toString() && !req.user.isAdmin) return res.status(403).json({ success: false, message: 'Not authorized' });

    await tripPlan.remove();
    res.json({ success: true, message: 'Trip plan deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete trip plan', error: error.message });
  }
});

// ==========================
// User profile update
// ==========================
router.put('/user/profile', authenticateToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }).select('-password');
    res.json({ success: true, message: 'Profile updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile', error: error.message });
  }
});

export default router;