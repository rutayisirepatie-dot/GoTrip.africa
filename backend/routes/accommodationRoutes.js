// backend/routes/accommodationRoutes.js
import { Router } from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validateAccommodation } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/', protect, authorize('admin'), validateAccommodation, (req, res) => {
  res.json({ success: true, message: 'Accommodation added' });
});

export default router;