// backend/routes/destinationRoutes.js
import express from 'express';
import Destination from '../models/Destination.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import logger from '../utils/logger.js';

const router = express.Router();

// GET all destinations
router.get('/', async (req, res, next) => {
  try {
    const destinations = await Destination.find({ isActive: true });
    res.json({ success: true, count: destinations.length, data: destinations });
  } catch (error) {
    logger.error(`Error fetching destinations: ${error.message}`);
    next(error);
  }
});

// GET single destination
router.get('/:id', async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination || !destination.isActive) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.json({ success: true, data: destination });
  } catch (error) {
    logger.error(`Error fetching destination ${req.params.id}: ${error.message}`);
    next(error);
  }
});

// POST new destination (admin)
router.post('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const destination = new Destination(req.body);
    const saved = await destination.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    logger.error(`Error creating destination: ${error.message}`);
    next(error);
  }
});

// PUT update destination (admin)
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    logger.error(`Error updating destination ${req.params.id}: ${error.message}`);
    next(error);
  }
});

// DELETE destination (soft delete, admin)
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });

    destination.isActive = false;
    await destination.save();
    res.json({ success: true, message: 'Destination deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting destination ${req.params.id}: ${error.message}`);
    next(error);
  }
});

export default router;