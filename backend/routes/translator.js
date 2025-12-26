import express from 'express';
import Translator from '../models/translatorModel.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// CREATE translator (admin)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const translator = await Translator.create(req.body);
    res.status(201).json({ success: true, data: translator });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET all translators
router.get('/', async (req, res) => {
  try {
    const translators = await Translator.find().sort({ createdAt: -1 });
    res.json({ success: true, data: translators });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET translator by ID
router.get('/:id', async (req, res) => {
  try {
    const translator = await Translator.findById(req.params.id);
    if (!translator) return res.status(404).json({ success: false, message: 'Translator not found' });
    res.json({ success: true, data: translator });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE translator (admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const translator = await Translator.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!translator) return res.status(404).json({ success: false, message: 'Translator not found' });
    res.json({ success: true, data: translator });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE translator (admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const translator = await Translator.findByIdAndDelete(req.params.id);
    if (!translator) return res.status(404).json({ success: false, message: 'Translator not found' });
    res.json({ success: true, message: 'Translator deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;