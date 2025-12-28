import express from 'express';
import { TripPlan } from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create trip plan
router.post('/', authenticateToken, async (req, res) => {
    try {
        const {
            start_date,
            duration,
            travelers,
            budget,
            interests,
            message
        } = req.body;

        // Generate trip reference
        const tripReference = `TRIP-${Date.now().toString().slice(-6)}`;

        const tripPlan = new TripPlan({
            user: req.user._id,
            userName: req.user.name,
            userEmail: req.user.email,
            tripReference,
            startDate: new Date(start_date),
            duration,
            travelers: parseInt(travelers),
            budget,
            interests: Array.isArray(interests) ? interests : [interests].filter(Boolean),
            message,
            status: 'review'
        });

        await tripPlan.save();

        res.status(201).json({
            success: true,
            message: 'Trip plan submitted successfully',
            data: tripPlan
        });
    } catch (error) {
        console.error('Create trip plan error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit trip plan',
            error: error.message
        });
    }
});

// Get user trip plans
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const tripPlans = await TripPlan.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: tripPlans
        });
    } catch (error) {
        console.error('Get user trip plans error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch trip plans',
            error: error.message
        });
    }
});

// Get single trip plan
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const tripPlan = await TripPlan.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!tripPlan) {
            return res.status(404).json({
                success: false,
                message: 'Trip plan not found'
            });
        }

        res.json({
            success: true,
            data: tripPlan
        });
    } catch (error) {
        console.error('Get trip plan error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch trip plan',
            error: error.message
        });
    }
});

// Cancel trip plan
router.put('/:id/cancel', authenticateToken, async (req, res) => {
    try {
        const tripPlan = await TripPlan.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!tripPlan) {
            return res.status(404).json({
                success: false,
                message: 'Trip plan not found'
            });
        }

        if (tripPlan.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Trip plan already cancelled'
            });
        }

        tripPlan.status = 'cancelled';
        await tripPlan.save();

        res.json({
            success: true,
            message: 'Trip plan cancelled successfully',
            data: tripPlan
        });
    } catch (error) {
        console.error('Cancel trip plan error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel trip plan',
            error: error.message
        });
    }
});

// Process trip plan (admin only)
router.put('/:id/process', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const tripPlan = await TripPlan.findById(req.params.id);

        if (!tripPlan) {
            return res.status(404).json({
                success: false,
                message: 'Trip plan not found'
            });
        }

        tripPlan.status = 'processing';
        tripPlan.assignedTo = req.user.name;
        tripPlan.assignedAt = new Date();
        await tripPlan.save();

        res.json({
            success: true,
            message: 'Trip plan is now being processed',
            data: tripPlan
        });
    } catch (error) {
        console.error('Process trip plan error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process trip plan',
            error: error.message
        });
    }
});

// Complete trip plan (admin only)
router.put('/:id/complete', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const { itinerary } = req.body;
        const tripPlan = await TripPlan.findById(req.params.id);

        if (!tripPlan) {
            return res.status(404).json({
                success: false,
                message: 'Trip plan not found'
            });
        }

        tripPlan.status = 'completed';
        tripPlan.itinerary = itinerary;
        await tripPlan.save();

        res.json({
            success: true,
            message: 'Trip plan completed successfully',
            data: tripPlan
        });
    } catch (error) {
        console.error('Complete trip plan error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to complete trip plan',
            error: error.message
        });
    }
});

// Get all trip plans (admin only)
router.get('/', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const { status } = req.query;
        const filter = {};

        if (status) filter.status = status;

        const tripPlans = await TripPlan.find(filter)
            .sort({ createdAt: -1 })
            .populate('user', 'name email phone');

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

export default router;