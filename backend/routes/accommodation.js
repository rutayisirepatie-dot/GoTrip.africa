import express from 'express';
import Accommodation from '../models/Accommodation.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// ======================
// GET ALL ACCOMMODATIONS (public)
// ======================
router.get('/', async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ available: true });
    res.json({ 
      success: true, 
      count: accommodations.length,
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

// ======================
// GET SINGLE ACCOMMODATION (public)
// ======================
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid accommodation ID' 
      });
    }

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

// ======================
// CREATE ACCOMMODATION (admin only)
// ======================
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
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
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create accommodation', 
      error: error.message 
    });
  }
});

// ======================
// UPDATE ACCOMMODATION (admin only)
// ======================
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid accommodation ID' 
      });
    }

    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Accommodation not found' 
      });
    }

    // Update fields (match your Accommodation model schema)
    const updatableFields = [
      'name', 'location', 'type', 'description', 
      'pricePerNight', 'rating', 'amenities', 'image',
      'available', 'contactPhone', 'contactEmail', 'maxGuests'
    ];
    
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        accommodation[field] = req.body[field];
      }
    });

    await accommodation.save();
    res.json({ 
      success: true, 
      message: 'Accommodation updated successfully', 
      data: accommodation 
    });
  } catch (error) {
    console.error('Update accommodation error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update accommodation', 
      error: error.message 
    });
  }
});

// ======================
// DELETE ACCOMMODATION (admin only)
// ======================
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid accommodation ID' 
      });
    }

    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Accommodation not found' 
      });
    }

    await Accommodation.findByIdAndDelete(req.params.id);
    res.json({ 
      success: true, 
      message: 'Accommodation deleted successfully' 
    });
  } catch (error) {
    console.error('Delete accommodation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete accommodation', 
      error: error.message 
    });
  }
});

export default router;