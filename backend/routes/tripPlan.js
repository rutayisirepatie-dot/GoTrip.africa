// routes/tripPlan.js
import express from 'express';
import TripPlan from '../models/TripPlan.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Create trip plan
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const tripPlanData = {
      ...req.body,
      userId,
      status: 'review',
      createdAt: new Date()
    };

    const tripPlan = new TripPlan(tripPlanData);
    await tripPlan.save();

    res.status(201).json({
      success: true,
      message: 'Trip plan submitted successfully',
      data: {
        trip_reference: tripPlan._id,
        status: tripPlan.status
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all trip plans (for admin)
router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user is admin
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const tripPlans = await TripPlan.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: tripPlans
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update trip plan status
router.put('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user is admin
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { id } = req.params;
    const updatedTripPlan = await TripPlan.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedTripPlan) {
      return res.status(404).json({ success: false, message: 'Trip plan not found' });
    }

    res.json({
      success: true,
      message: 'Trip plan updated successfully',
      data: updatedTripPlan
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;