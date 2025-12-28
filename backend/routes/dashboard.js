import express from 'express';
import { 
    User, 
    Booking, 
    TripPlan,
    Guide,
    Translator,
    Destination,
    Accommodation,
    Blog,
    Newsletter,
    Contact
} from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// User Dashboard
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const userId = req.user._id;

        // Get user bookings
        const bookings = await Booking.find({ user: userId });
        const tripPlans = await TripPlan.find({ user: userId });

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
        const pendingTripPlans = tripPlans.filter(t => t.status === 'review').length;

        // Get recent bookings and trip plans
        const recentBookings = bookings.slice(0, 5);
        const recentTripPlans = tripPlans.slice(0, 5);

        res.json({
            success: true,
            data: {
                stats: {
                    totalBookings,
                    upcomingBookings,
                    completedBookings,
                    totalSpent,
                    pendingTripPlans
                },
                recentBookings,
                recentTripPlans
            }
        });
    } catch (error) {
        console.error('User dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load dashboard',
            error: error.message
        });
    }
});

// Admin Dashboard
router.get('/admin', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        // Get stats
        const totalUsers = await User.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const activeBookings = await Booking.countDocuments({ 
            status: { $in: ['confirmed', 'pending'] }
        });
        
        const totalRevenue = await Booking.aggregate([
            { $match: { status: 'confirmed' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        const pendingTripPlans = await TripPlan.countDocuments({ status: 'review' });

        // Get monthly revenue
        const monthlyRevenue = await Booking.aggregate([
            {
                $match: {
                    status: 'confirmed',
                    createdAt: { 
                        $gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                    }
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
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        // Get recent activity
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('user', 'name email');

        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('-password');

        const recentTripPlans = await TripPlan.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name email');

        // Format monthly revenue
        const formattedMonthlyRevenue = monthlyRevenue.map(item => ({
            month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
            revenue: item.revenue
        }));

        // Format recent activity
        const recentActivity = [
            ...recentUsers.map(user => ({
                type: 'user',
                id: user._id,
                name: user.name,
                email: user.email,
                action: 'registered',
                timestamp: user.createdAt
            })),
            ...recentBookings.map(booking => ({
                type: 'booking',
                id: booking._id,
                name: booking.user?.name || booking.userName,
                email: booking.user?.email || booking.userEmail,
                action: booking.status,
                timestamp: booking.createdAt
            })),
            ...recentTripPlans.map(trip => ({
                type: 'trip_plan',
                id: trip._id,
                name: trip.user?.name || trip.userName,
                email: trip.user?.email || trip.userEmail,
                action: 'requested',
                timestamp: trip.createdAt
            }))
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
         .slice(0, 20);

        res.json({
            success: true,
            data: {
                stats: {
                    totalUsers,
                    totalBookings,
                    activeBookings,
                    totalRevenue: totalRevenue[0]?.total || 0,
                    pendingTripPlans
                },
                monthlyRevenue: formattedMonthlyRevenue,
                recentActivity,
                recentUsers,
                recentBookings: recentBookings.slice(0, 5)
            }
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load admin dashboard',
            error: error.message
        });
    }
});

// Get all users (admin only)
router.get('/admin/users', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
});

// Get all bookings (admin only)
router.get('/admin/bookings', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error('Get all bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
});

// Update user profile
router.put('/user/profile', authenticateToken, async (req, res) => {
    try {
        const { name, phone, country, address, dob, passport, preferences } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name,
                phone,
                country,
                address,
                dob: dob ? new Date(dob) : null,
                passport,
                preferences
            },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: error.message
        });
    }
});

export default router;