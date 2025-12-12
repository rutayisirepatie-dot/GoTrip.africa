import Guide from '../models/Guide.js';
import logger from '../utils/logger.js';

// Get all guides
export const getAllGuides = async (req, res, next) => {
  try {
    const guides = await Guide.find().sort({ createdAt: -1 });
    res.json({ success: true, data: guides });
  } catch (error) {
    logger.error(`Error fetching guides: ${error.message}`);
    next(error);
  }
};

// Get guide by ID
export const getGuideById = async (req, res, next) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, data: guide });
  } catch (error) {
    logger.error(`Error fetching guide by ID: ${error.message}`);
    next(error);
  }
};

// Get guide by slug
export const getGuideBySlug = async (req, res, next) => {
  try {
    const guide = await Guide.findOne({ slug: req.params.slug });
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, data: guide });
  } catch (error) {
    logger.error(`Error fetching guide by slug: ${error.message}`);
    next(error);
  }
};

// Create a guide
export const createGuide = async (req, res, next) => {
  try {
    const guide = await Guide.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, data: guide });
  } catch (error) {
    logger.error(`Error creating guide: ${error.message}`);
    next(error);
  }
};

// Update a guide
export const updateGuide = async (req, res, next) => {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, data: guide });
  } catch (error) {
    logger.error(`Error updating guide: ${error.message}`);
    next(error);
  }
};

// Delete a guide
export const deleteGuide = async (req, res, next) => {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, message: 'Guide deleted' });
  } catch (error) {
    logger.error(`Error deleting guide: ${error.message}`);
    next(error);
  }
};

// Activate a guide
export const activateGuide = async (req, res, next) => {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, data: guide });
  } catch (error) {
    logger.error(`Error activating guide: ${error.message}`);
    next(error);
  }
};