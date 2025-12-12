const express = require('express');
const router = express.Router();
const TripPlan = require('../models/TripPlan');
const authMiddleware = require('../middleware/auth');

// Submit trip plan
router.post('/submit', async (req, res) => {
  try {
    const {
      name,
      email,
      start_date,
      duration,
      travelers,
      services,
      interests,
      budget,
      message,
      phone,
      other_service
    } = req.body;
    
    // Create trip plan
    const tripPlan = new TripPlan({
      name,
      email,
      phone: phone || '',
      startDate: new Date(start_date),
      duration,
      travelers,
      services: services || [],
      interests: interests || [],
      budget,
      message: message || '',
      otherService: other_service || '',
      source: req.get('origin') || 'website',
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });
    
    await tripPlan.save();
    
    res.status(201).json({
      success: true,
      message: 'Trip plan submitted successfully! Our travel expert will contact you soon.',
      data: tripPlan
    });
    
  } catch (error) {
    console.error('Trip plan submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit trip plan. Please try again.',
      error: error.message
    });
  }
});

// Get trip plans (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }
    
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = {};
    if (status) query.status = status;
    
    const tripPlans = await TripPlan.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await TripPlan.countDocuments(query);
    
    res.json({
      success: true,
      data: tripPlans,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get trip plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Update trip plan status (admin only)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }
    
    const { status, notes } = req.body;
    
    const tripPlan = await TripPlan.findById(req.params.id);
    
    if (!tripPlan) {
      return res.status(404).json({
        success: false,
        message: 'Trip plan not found'
      });
    }
    
    tripPlan.status = status;
    
    if (notes) {
      tripPlan.notes.push({
        content: notes,
        createdBy: req.user.userId
      });
    }
    
    if (status === 'contacted' && !tripPlan.assignedTo) {
      tripPlan.assignedTo = req.user.userId;
    }
    
    await tripPlan.save();
    
    res.json({
      success: true,
      message: 'Trip plan updated successfully',
      data: tripPlan
    });
    
  } catch (error) {
    console.error('Update trip plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;