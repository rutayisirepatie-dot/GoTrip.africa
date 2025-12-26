import express from 'express';
import Accommodation from '../models/accommodationModel.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// CREATE accommodation (admin)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const accommodation = await Accommodation.create(req.body);
    res.status(201).json({ success: true, data: accommodation });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET all accommodations
router.get('/', async (req, res) => {
  try {
    const accommodations = await Accommodation.find().sort({ createdAt: -1 });
    res.json({ success: true, data: accommodations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET accommodation by ID
router.get('/:id', async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) return res.status(404).json({ success: false, message: 'Accommodation not found' });
    res.json({ success: true, data: accommodation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE accommodation (admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!accommodation) return res.status(404).json({ success: false, message: 'Accommodation not found' });
    res.json({ success: true, data: accommodation });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE accommodation (admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndDelete(req.params.id);
    if (!accommodation) return res.status(404).json({ success: false, message: 'Accommodation not found' });
    res.json({ success: true, message: 'Accommodation deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;