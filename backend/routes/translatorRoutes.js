// backend/routes/translatorRoutes.js
import { Router } from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'Translator added' });
});

export default router;