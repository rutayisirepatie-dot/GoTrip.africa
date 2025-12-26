import express from 'express';
import Destination from '../models/destinationModel.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// CREATE destination (admin)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json({ success: true, data: destination });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.json({ success: true, data: destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET destination by ID
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, data: destination });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE destination (admin)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, data: destination });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE destination (admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.json({ success: true, message: 'Destination deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;