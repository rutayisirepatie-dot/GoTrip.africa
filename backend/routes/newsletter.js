// routes/newsletter.js
import express from 'express';
import Newsletter from '../models/Newsletter.js';

const router = express.Router();

// Subscribe to newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.json({
        success: true,
        message: 'Already subscribed to newsletter',
        data: existingSubscriber
      });
    }

    const subscriber = new Newsletter({
      email,
      subscribedAt: new Date()
    });

    await subscriber.save();

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscriber
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;