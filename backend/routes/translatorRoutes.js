import express from 'express';
import Translator from '../models/Translator.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/translators - list all translators
router.get('/', async (req, res, next) => {
  try {
    const translators = await Translator.find({ isActive: true });
    res.json({ success: true, count: translators.length, data: translators });
  } catch (error) {
    next(error);
  }
});

// GET /api/translators/:id - get single translator
router.get('/:id', async (req, res, next) => {
  try {
    const translator = await Translator.findById(req.params.id);
    if (!translator || !translator.isActive) {
      return res.status(404).json({ success: false, message: 'Translator not found' });
    }
    res.json({ success: true, data: translator });
  } catch (error) {
    next(error);
  }
});

// POST /api/translators - create translator (admin only)
router.post('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const translator = new Translator(req.body);
    const saved = await translator.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    next(error);
  }
});

// PUT /api/translators/:id - update translator (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const updated = await Translator.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Translator not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/translators/:id - deactivate translator (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const translator = await Translator.findById(req.params.id);
    if (!translator) {
      return res.status(404).json({ success: false, message: 'Translator not found' });
    }
    translator.isActive = false;
    await translator.save();
    res.json({ success: true, message: 'Translator deactivated' });
  } catch (error) {
    next(error);
  }
});

export default router;