import express from 'express';
import { User, Booking, TripPlan } from '../models/index.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Use both auth and admin middleware for all routes
router.use(authMiddleware, adminMiddleware);

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
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

// Get all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
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

// Get all trip plans
router.get('/tripPlans', async (req, res) => {
    try {
        const tripPlans = await TripPlan.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: tripPlans
        });
    } catch (error) {
        console.error('Get all trip plans error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch trip plans',
            error: error.message
        });
    }
});

// Create new user (admin only)
router.post('/users', async (req, res) => {
    try {
        const { name, email, password, phone, country, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const user = new User({
            name,
            email,
            password,
            phone,
            country,
            role: role || 'user'
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
        console.error('Create user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
});

export default router;