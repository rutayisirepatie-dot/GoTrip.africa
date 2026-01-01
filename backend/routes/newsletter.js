// backend/routes/newsletter.js
import express from 'express';
import { Newsletter } from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// ====================
// Subscribe to newsletter (public)
// ====================
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.status === 'active') {
        return res.status(400).json({ success: false, message: 'Email already subscribed' });
      } else {
        existing.status = 'active';
        existing.subscribedAt = new Date();
        await existing.save();
        return res.json({ success: true, message: 'Subscription reactivated', data: existing });
      }
    }

    const newsletter = new Newsletter({ email, status: 'active' });
    await newsletter.save();

    res.status(201).json({ success: true, message: 'Subscribed successfully', data: newsletter });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ success: false, message: 'Subscription failed', error: error.message });
  }
});

// ====================
// Unsubscribe from newsletter (public)
// ====================
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = await Newsletter.findOne({ email });
    if (!subscriber) return res.status(404).json({ success: false, message: 'Email not found' });

    subscriber.status = 'unsubscribed';
    await subscriber.save();

    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ success: false, message: 'Unsubscribe failed', error: error.message });
  }
});

// ====================
// GET ALL SUBSCRIBERS (admin only)
// ====================
router.get('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json({ success: true, data: subscribers });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers', error: error.message });
  }
});

// ====================
// GET SINGLE SUBSCRIBER (admin only)
// ====================
router.get('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid subscriber ID' });
    }

    const subscriber = await Newsletter.findById(req.params.id);
    if (!subscriber) return res.status(404).json({ success: false, message: 'Subscriber not found' });

    res.json({ success: true, data: subscriber });
  } catch (error) {
    console.error('Get subscriber error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subscriber', error: error.message });
  }
});

// ====================
// UPDATE SUBSCRIBER (admin only)
// ====================
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid subscriber ID' });
    }

    const subscriber = await Newsletter.findById(req.params.id);
    if (!subscriber) return res.status(404).json({ success: false, message: 'Subscriber not found' });

    const { email, status } = req.body;
    if (email) subscriber.email = email;
    if (status) subscriber.status = status;

    await subscriber.save();
    res.json({ success: true, message: 'Subscriber updated successfully', data: subscriber });
  } catch (error) {
    console.error('Update subscriber error:', error);
    res.status(500).json({ success: false, message: 'Failed to update subscriber', error: error.message });
  }
});

// ====================
// DELETE SUBSCRIBER (admin only)
// ====================
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid subscriber ID' });
    }

    const subscriber = await Newsletter.findById(req.params.id);
    if (!subscriber) return res.status(404).json({ success: false, message: 'Subscriber not found' });

    await subscriber.remove();
    res.json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete subscriber', error: error.message });
  }
});

export default router;