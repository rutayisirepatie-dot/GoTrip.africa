import express from 'express';
import Guide from '../models/guideModel.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// CREATE guide (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const guide = await Guide.create(req.body);
    res.status(201).json({ success: true, data: guide });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET all guides
router.get('/', async (req, res) => {
  try {
    const guides = await Guide.find().sort({ createdAt: -1 });
    res.json({ success: true, data: guides });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET guide by ID
router.get('/:id', async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, data: guide });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE guide (admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, data: guide });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE guide (admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, message: 'Guide deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;