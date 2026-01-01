// backend/routes/guide.js
import express from 'express';
import { Guide } from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// ====================
// GET all guides (public)
// ====================
router.get('/', async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json({ success: true, data: guides });
  } catch (error) {
    console.error('Get guides error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch guides', error: error.message });
  }
});

// ====================
// GET single guide by ID (public)
// ====================
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid guide ID' });
    }

    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ success: false, message: 'Guide not found' });
    }

    res.json({ success: true, data: guide });
  } catch (error) {
    console.error('Get guide error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch guide', error: error.message });
  }
});

// ====================
// CREATE guide (admin only)
// ====================
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { name, languages, experience, contact, image } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({ success: false, message: 'Guide name is required' });
    }

    const guide = new Guide({ name, languages, experience, contact, image });
    await guide.save();

    res.status(201).json({ success: true, message: 'Guide created successfully', data: guide });
  } catch (error) {
    console.error('Create guide error:', error);
    res.status(500).json({ success: false, message: 'Failed to create guide', error: error.message });
  }
});

// ====================
// UPDATE guide (admin only)
// ====================
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid guide ID' });
    }

    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ success: false, message: 'Guide not found' });
    }

    // Update only provided fields
    const { name, languages, experience, contact, image } = req.body;
    if (name !== undefined) guide.name = name;
    if (languages !== undefined) guide.languages = languages;
    if (experience !== undefined) guide.experience = experience;
    if (contact !== undefined) guide.contact = contact;
    if (image !== undefined) guide.image = image;

    await guide.save();
    res.json({ success: true, message: 'Guide updated successfully', data: guide });
  } catch (error) {
    console.error('Update guide error:', error);
    res.status(500).json({ success: false, message: 'Failed to update guide', error: error.message });
  }
});

// ====================
// DELETE guide (admin only)
// ====================
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid guide ID' });
    }

    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ success: false, message: 'Guide not found' });
    }

    await guide.remove();
    res.json({ success: true, message: 'Guide deleted successfully' });
  } catch (error) {
    console.error('Delete guide error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete guide', error: error.message });
  }
});

export default router;