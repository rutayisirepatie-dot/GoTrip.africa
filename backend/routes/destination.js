// backend/routes/destination.js
import express from 'express';
import { Destination } from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// ====================
// GET all destinations (public)
// ====================
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json({ success: true, data: destinations });
  } catch (error) {
    console.error('Get destinations error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch destinations', error: error.message });
  }
});

// ====================
// GET single destination by ID (public)
// ====================
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid destination ID' });
    }

    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.json({ success: true, data: destination });
  } catch (error) {
    console.error('Get destination error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch destination', error: error.message });
  }
});

// ====================
// CREATE destination (admin only)
// ====================
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { name, description, country, image } = req.body;

    if (!name || !country) {
      return res.status(400).json({ success: false, message: 'Name and country are required' });
    }

    const destination = new Destination({ name, description, country, image });
    await destination.save();

    res.status(201).json({ success: true, message: 'Destination created successfully', data: destination });
  } catch (error) {
    console.error('Create destination error:', error);
    res.status(500).json({ success: false, message: 'Failed to create destination', error: error.message });
  }
});

// ====================
// UPDATE destination (admin only)
// ====================
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { name, description, country, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid destination ID' });
    }

    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    // Update fields only if provided
    if (name) destination.name = name;
    if (description) destination.description = description;
    if (country) destination.country = country;
    if (image) destination.image = image;

    await destination.save();
    res.json({ success: true, message: 'Destination updated successfully', data: destination });
  } catch (error) {
    console.error('Update destination error:', error);
    res.status(500).json({ success: false, message: 'Failed to update destination', error: error.message });
  }
});

// ====================
// DELETE destination (admin only)
// ====================
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid destination ID' });
    }

    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    await destination.remove();
    res.json({ success: true, message: 'Destination deleted successfully' });
  } catch (error) {
    console.error('Delete destination error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete destination', error: error.message });
  }
});

export default router;