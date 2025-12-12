// backend/routes/guideRoutes.js
import express from 'express';
import * as guideController from '../controllers/guideController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validateGuide } from '../middleware/validationMiddleware.js';

const router = express.Router();

// -------------------- Public Routes -------------------- //
// List all guides
router.get('/', guideController.getAllGuides);

// Get guide by ID
router.get('/:id', guideController.getGuideById);

// Get guide by slug
router.get('/slug/:slug', guideController.getGuideBySlug);

// -------------------- Admin Routes (Protected) -------------------- //
router.use(protect); // Require authentication
router.use(authorize('admin')); // Require admin role

// Create a new guide
router.post('/', validateGuide, guideController.createGuide);

// Update a guide by ID
router.put('/:id', validateGuide, guideController.updateGuide);

// Delete a guide by ID
router.delete('/:id', guideController.deleteGuide);

// Activate a guide by ID
router.patch('/:id/activate', guideController.activateGuide);

export default router;