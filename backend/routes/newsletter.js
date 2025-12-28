import express from 'express';
import { Newsletter } from '../models/index.js';

const router = express.Router();

// Subscribe to newsletter
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        // Check if already subscribed
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            if (existingSubscriber.status === 'active') {
                return res.status(400).json({
                    success: false,
                    message: 'Email already subscribed'
                });
            } else {
                // Reactivate subscription
                existingSubscriber.status = 'active';
                existingSubscriber.subscribedAt = new Date();
                await existingSubscriber.save();

                return res.json({
                    success: true,
                    message: 'Subscription reactivated successfully',
                    data: existingSubscriber
                });
            }
        }

        // Create new subscription
        const newsletter = new Newsletter({
            email,
            status: 'active'
        });

        await newsletter.save();

        res.status(201).json({
            success: true,
            message: 'Subscribed to newsletter successfully',
            data: newsletter
        });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Subscription failed',
            error: error.message
        });
    }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
    try {
        const { email } = req.body;

        const subscriber = await Newsletter.findOne({ email });
        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'Email not found in newsletter list'
            });
        }

        subscriber.status = 'unsubscribed';
        await subscriber.save();

        res.json({
            success: true,
            message: 'Unsubscribed successfully'
        });
    } catch (error) {
        console.error('Unsubscribe error:', error);
        res.status(500).json({
            success: false,
            message: 'Unsubscribe failed',
            error: error.message
        });
    }
});

// Get all subscribers (admin only)
router.get('/', async (req, res) => {
    try {
        const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
        
        res.json({
            success: true,
            data: subscribers
        });
    } catch (error) {
        console.error('Get subscribers error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch subscribers',
            error: error.message
        });
    }
});

export default router;