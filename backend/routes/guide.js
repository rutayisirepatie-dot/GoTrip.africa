import express from 'express';
import { Guide } from '../models/index.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all guides
router.get('/', async (req, res) => {
    try {
        const guides = await Guide.find();
        res.json({
            success: true,
            data: guides
        });
    } catch (error) {
        console.error('Get guides error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch guides',
            error: error.message
        });
    }
});

// Get single guide
router.get('/:id', async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        
        if (!guide) {
            return res.status(404).json({
                success: false,
                message: 'Guide not found'
            });
        }

        res.json({
            success: true,
            data: guide
        });
    } catch (error) {
        console.error('Get guide error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch guide',
            error: error.message
        });
    }
});

// Create guide (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const guide = new Guide(req.body);
        await guide.save();

        res.status(201).json({
            success: true,
            message: 'Guide created successfully',
            data: guide
        });
    } catch (error) {
        console.error('Create guide error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create guide',
            error: error.message
        });
    }
});

// Update guide (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const guide = await Guide.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!guide) {
            return res.status(404).json({
                success: false,
                message: 'Guide not found'
            });
        }

        res.json({
            success: true,
            message: 'Guide updated successfully',
            data: guide
        });
    } catch (error) {
        console.error('Update guide error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update guide',
            error: error.message
        });
    }
});

// Delete guide (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const guide = await Guide.findByIdAndDelete(req.params.id);

        if (!guide) {
            return res.status(404).json({
                success: false,
                message: 'Guide not found'
            });
        }

        res.json({
            success: true,
            message: 'Guide deleted successfully'
        });
    } catch (error) {
        console.error('Delete guide error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete guide',
            error: error.message
        });
    }
});

export default router;