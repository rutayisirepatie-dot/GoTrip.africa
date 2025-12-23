// backend/routes/guideRoutes.js
import { Router } from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validateGuide } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/', protect, authorize('admin'), validateGuide, (req, res) => {
  res.json({ success: true, message: 'Guide added' });
});

export default router;