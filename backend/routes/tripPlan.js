// backend/routes/tripPlan.js
import express from 'express';
import { TripPlan } from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// --- Helper to parse date safely ---
const parseDate = (dateStr) => {
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
};

// ====================
// CREATE trip plan (any authenticated user)
// ====================
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { startDate, duration, travelers, budget, interests, message } = req.body;

    const parsedDate = parseDate(startDate);
    if (!parsedDate) {
      return res.status(400).json({ success: false, message: 'Invalid startDate. Use YYYY-MM-DD or ISO string.' });
    }
    if (!duration || !travelers || !budget) {
      return res.status(400).json({ success: false, message: 'duration, travelers, and budget are required' });
    }

    const tripReference = `TRIP-${Date.now().toString().slice(-6)}`;

    const tripPlan = new TripPlan({
      user: req.user._id,
      userName: req.user.name,
      userEmail: req.user.email,
      tripReference,
      startDate: parsedDate,
      duration: Number(duration),
      travelers: Number(travelers),
      budget: Number(budget),
      interests: Array.isArray(interests) ? interests : [interests].filter(Boolean),
      message,
      status: 'review'
    });

    await tripPlan.save();
    res.status(201).json({ success: true, message: 'Trip plan submitted successfully', data: tripPlan });
  } catch (error) {
    console.error('Create trip plan error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit trip plan', error: error.message });
  }
});

// ====================
// GET all trip plans (admin only)
// ====================
router.get('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const tripPlans = await TripPlan.find().sort({ startDate: -1 });
    res.json({ success: true, data: tripPlans });
  } catch (error) {
    console.error('Get trip plans error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch trip plans', error: error.message });
  }
});

// ====================
// GET user trip plans (authenticated)
// ====================
router.get('/my', authenticateToken, async (req, res) => {
  try {
    const tripPlans = await TripPlan.find({ user: req.user._id }).sort({ startDate: -1 });
    res.json({ success: true, data: tripPlans });
  } catch (error) {
    console.error('Get user trip plans error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch your trip plans', error: error.message });
  }
});

// ====================
// GET single trip plan by ID (user or admin)
// ====================
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid trip plan ID' });
    }

    const tripPlan = await TripPlan.findById(req.params.id);
    if (!tripPlan) return res.status(404).json({ success: false, message: 'Trip plan not found' });

    // Only owner or admin can view
    if (tripPlan.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this trip plan' });
    }

    res.json({ success: true, data: tripPlan });
  } catch (error) {
    console.error('Get trip plan error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch trip plan', error: error.message });
  }
});

// ====================
// UPDATE trip plan (admin only)
// ====================
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid trip plan ID' });
    }

    const tripPlan = await TripPlan.findById(req.params.id);
    if (!tripPlan) return res.status(404).json({ success: false, message: 'Trip plan not found' });

    const { startDate, duration, travelers, budget, interests, message, status } = req.body;

    if (startDate) {
      const parsedDate = parseDate(startDate);
      if (!parsedDate) throw new Error('Invalid startDate');
      tripPlan.startDate = parsedDate;
    }
    if (duration) tripPlan.duration = Number(duration);
    if (travelers) tripPlan.travelers = Number(travelers);
    if (budget) tripPlan.budget = Number(budget);
    if (interests) tripPlan.interests = Array.isArray(interests) ? interests : [interests].filter(Boolean);
    if (message) tripPlan.message = message;
    if (status) tripPlan.status = status;

    await tripPlan.save();
    res.json({ success: true, message: 'Trip plan updated successfully', data: tripPlan });
  } catch (error) {
    console.error('Update trip plan error:', error);
    res.status(500).json({ success: false, message: 'Failed to update trip plan', error: error.message });
  }
});

// ====================
// DELETE trip plan (owner or admin)
// ====================
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid trip plan ID' });
    }

    const tripPlan = await TripPlan.findById(req.params.id);
    if (!tripPlan) return res.status(404).json({ success: false, message: 'Trip plan not found' });

    if (tripPlan.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this trip plan' });
    }

    await tripPlan.remove();
    res.json({ success: true, message: 'Trip plan deleted successfully' });
  } catch (error) {
    console.error('Delete trip plan error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete trip plan', error: error.message });
  }
});

export default router;