import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';
import Guide from '../models/guideModel.js';
import Destination from '../models/destinationModel.js';
import Translator from '../models/translatorModel.js';
import Accommodation from '../models/accommodationModel.js';
import Booking from '../models/bookingModel.js';

const router = express.Router();

// ================== GUIDES ==================
// Get all guides
router.get('/guides', authMiddleware, adminMiddleware, async (req, res) => {
  const guides = await Guide.find();
  res.json({ success: true, data: guides });
});

// Create guide
router.post('/guides', authMiddleware, adminMiddleware, async (req, res) => {
  const guide = await Guide.create(req.body);
  res.status(201).json({ success: true, data: guide });
});

// Update guide
router.put('/guides/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: guide });
});

// Delete guide
router.delete('/guides/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await Guide.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Guide deleted' });
});

// ================== DESTINATIONS ==================
router.get('/destinations', authMiddleware, adminMiddleware, async (req, res) => {
  const destinations = await Destination.find();
  res.json({ success: true, data: destinations });
});

router.post('/destinations', authMiddleware, adminMiddleware, async (req, res) => {
  const dest = await Destination.create(req.body);
  res.status(201).json({ success: true, data: dest });
});

router.put('/destinations/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const dest = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: dest });
});

router.delete('/destinations/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await Destination.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Destination deleted' });
});

// ================== TRANSLATORS ==================
router.get('/translators', authMiddleware, adminMiddleware, async (req, res) => {
  const translators = await Translator.find();
  res.json({ success: true, data: translators });
});

router.post('/translators', authMiddleware, adminMiddleware, async (req, res) => {
  const translator = await Translator.create(req.body);
  res.status(201).json({ success: true, data: translator });
});

router.put('/translators/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const translator = await Translator.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: translator });
});

router.delete('/translators/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await Translator.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Translator deleted' });
});

// ================== ACCOMMODATIONS ==================
router.get('/accommodations', authMiddleware, adminMiddleware, async (req, res) => {
  const accommodations = await Accommodation.find();
  res.json({ success: true, data: accommodations });
});

router.post('/accommodations', authMiddleware, adminMiddleware, async (req, res) => {
  const acc = await Accommodation.create(req.body);
  res.status(201).json({ success: true, data: acc });
});

router.put('/accommodations/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const acc = await Accommodation.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: acc });
});

router.delete('/accommodations/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await Accommodation.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Accommodation deleted' });
});

// ================== BOOKINGS ==================
router.get('/bookings', authMiddleware, adminMiddleware, async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json({ success: true, data: bookings });
});

router.patch('/bookings/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json({ success: true, data: booking });
});

export default router;