import express from 'express';
import { Destination } from '../models/index.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all destinations
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json({
            success: true,
            data: destinations
        });
    } catch (error) {
        console.error('Get destinations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch destinations',
            error: error.message
        });
    }
});

// Get single destination
router.get('/:id', async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        
        if (!destination) {
            return res.status(404).json({
                success: false,
                message: 'Destination not found'
            });
        }

        res.json({
            success: true,
            data: destination
        });
    } catch (error) {
        console.error('Get destination error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch destination',
            error: error.message
        });
    }
});

// Create destination (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const destination = new Destination(req.body);
        await destination.save();

        res.status(201).json({
            success: true,
            message: 'Destination created successfully',
            data: destination
        });
    } catch (error) {
        console.error('Create destination error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create destination',
            error: error.message
        });
    }
});

export default router;