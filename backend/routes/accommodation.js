import express from 'express';
import { Accommodation } from '../models/index.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all accommodations
router.get('/', async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        res.json({
            success: true,
            data: accommodations
        });
    } catch (error) {
        console.error('Get accommodations error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch accommodations',
            error: error.message
        });
    }
});

// Get single accommodation
router.get('/:id', async (req, res) => {
    try {
        const accommodation = await Accommodation.findById(req.params.id);
        
        if (!accommodation) {
            return res.status(404).json({
                success: false,
                message: 'Accommodation not found'
            });
        }

        res.json({
            success: true,
            data: accommodation
        });
    } catch (error) {
        console.error('Get accommodation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch accommodation',
            error: error.message
        });
    }
});

// Create accommodation (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const accommodation = new Accommodation(req.body);
        await accommodation.save();

        res.status(201).json({
            success: true,
            message: 'Accommodation created successfully',
            data: accommodation
        });
    } catch (error) {
        console.error('Create accommodation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create accommodation',
            error: error.message
        });
    }
});

export default router;