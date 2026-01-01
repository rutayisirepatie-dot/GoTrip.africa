// backend/routes/translator.js
import express from 'express';
import { Translator } from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// ====================
// GET all translators (public)
// ====================
router.get('/', async (req, res) => {
  try {
    const translators = await Translator.find();
    res.json({ success: true, data: translators });
  } catch (error) {
    console.error('Get translators error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch translators', error: error.message });
  }
});

// ====================
// GET single translator by ID (public)
// ====================
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid translator ID' });
    }

    const translator = await Translator.findById(req.params.id);
    if (!translator) {
      return res.status(404).json({ success: false, message: 'Translator not found' });
    }

    res.json({ success: true, data: translator });
  } catch (error) {
    console.error('Get translator error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch translator', error: error.message });
  }
});

// ====================
// CREATE translator (admin only)
// ====================
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { name, languages, experience, contact, image } = req.body;

    // Basic validation
    if (!name || !languages) {
      return res.status(400).json({ success: false, message: 'Name and languages are required' });
    }

    const translator = new Translator({ name, languages, experience, contact, image });
    await translator.save();

    res.status(201).json({ success: true, message: 'Translator created successfully', data: translator });
  } catch (error) {
    console.error('Create translator error:', error);
    res.status(500).json({ success: false, message: 'Failed to create translator', error: error.message });
  }
});

// ====================
// UPDATE translator (admin only)
// ====================
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid translator ID' });
    }

    const translator = await Translator.findById(req.params.id);
    if (!translator) {
      return res.status(404).json({ success: false, message: 'Translator not found' });
    }

    // Update only provided fields
    const { name, languages, experience, contact, image } = req.body;
    if (name !== undefined) translator.name = name;
    if (languages !== undefined) translator.languages = languages;
    if (experience !== undefined) translator.experience = experience;
    if (contact !== undefined) translator.contact = contact;
    if (image !== undefined) translator.image = image;

    await translator.save();
    res.json({ success: true, message: 'Translator updated successfully', data: translator });
  } catch (error) {
    console.error('Update translator error:', error);
    res.status(500).json({ success: false, message: 'Failed to update translator', error: error.message });
  }
});

// ====================
// DELETE translator (admin only)
// ====================
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid translator ID' });
    }

    const translator = await Translator.findById(req.params.id);
    if (!translator) {
      return res.status(404).json({ success: false, message: 'Translator not found' });
    }

    await translator.remove();
    res.json({ success: true, message: 'Translator deleted successfully' });
  } catch (error) {
    console.error('Delete translator error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete translator', error: error.message });
  }
});

export default router;