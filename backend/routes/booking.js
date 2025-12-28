import express from 'express';
import { Booking } from '../models/index.js';
import { authenticateToken, authorizeAdmin, authorizeUserOrAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create booking
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
            date: new Date(date),
            duration: parseInt(duration),
            travelers: parseInt(travelers),
            totalAmount: parseFloat(total_amount),
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

// Get user bookings
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
});

// Get single booking
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id,
            user: req.user._id
        });

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
        console.error('Get booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch booking',
            error: error.message
        });
    }
});

// Cancel booking
router.put('/:id/cancel', authenticateToken, async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        if (booking.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Booking already cancelled'
            });
        }

        booking.status = 'cancelled';
        booking.paymentStatus = 'refunded';
        await booking.save();

        res.json({
            success: true,
            message: 'Booking cancelled successfully',
            data: booking
        });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel booking',
            error: error.message
        });
    }
});

// Confirm booking (admin only)
router.put('/:id/confirm', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        if (booking.status === 'confirmed') {
            return res.status(400).json({
                success: false,
                message: 'Booking already confirmed'
            });
        }

        booking.status = 'confirmed';
        booking.paymentStatus = 'paid';
        await booking.save();

        res.json({
            success: true,
            message: 'Booking confirmed successfully',
            data: booking
        });
    } catch (error) {
        console.error('Confirm booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to confirm booking',
            error: error.message
        });
    }
});

// Get all bookings (admin only)
router.get('/', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const { status, serviceType } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (serviceType) filter.serviceType = serviceType;

        const bookings = await Booking.find(filter)
            .sort({ createdAt: -1 })
            .populate('user', 'name email phone');

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

export default router;