// backend/routes/blogRoutes.js
import express from 'express';
import * as blogController from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validateBlog } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Admin routes (protected)
router.use(protect);
router.use(authorize('admin'));

router.post('/', validateBlog, blogController.createBlog);
router.put('/:id', validateBlog, blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

export default router;