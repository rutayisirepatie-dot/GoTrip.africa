// backend/routes/blogRoutes.js
import { Router } from 'express';
import { validateBlog } from '../middleware/validationMiddleware.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, authorize('admin'), validateBlog, (req, res) => {
  res.json({ success: true, message: 'Blog post created' });
});

export default router;