import express from 'express';
import Newsletter from '../models/Newsletter.js';

const router = express.Router();

// POST subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.json({
        success: true,
        message: 'You are already subscribed!'
      });
    }

    const newsletter = new Newsletter({
      email,
      source: 'website'
    });

    await newsletter.save();

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: {
        email: newsletter.email,
        subscribedAt: newsletter.subscribedAt
      }
    });
  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    
    // If duplicate email error, still return success
    if (error.code === 11000) {
      return res.json({
        success: true,
        message: 'You are already subscribed!'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to subscribe'
    });
  }
});

export default router;