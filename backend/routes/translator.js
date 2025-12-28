import express from 'express';
import { Translator } from '../models/index.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all translators
router.get('/', async (req, res) => {
    try {
        const translators = await Translator.find();
        res.json({
            success: true,
            data: translators
        });
    } catch (error) {
        console.error('Get translators error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch translators',
            error: error.message
        });
    }
});

// Get single translator
router.get('/:id', async (req, res) => {
    try {
        const translator = await Translator.findById(req.params.id);
        
        if (!translator) {
            return res.status(404).json({
                success: false,
                message: 'Translator not found'
            });
        }

        res.json({
            success: true,
            data: translator
        });
    } catch (error) {
        console.error('Get translator error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch translator',
            error: error.message
        });
    }
});

// Create translator (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const translator = new Translator(req.body);
        await translator.save();

        res.status(201).json({
            success: true,
            message: 'Translator created successfully',
            data: translator
        });
    } catch (error) {
        console.error('Create translator error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create translator',
            error: error.message
        });
    }
});

export default router;