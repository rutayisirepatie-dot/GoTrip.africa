// backend/routes/destinationRoutes.js
import { Router } from 'express';
import { validateDestination } from '../middleware/validationMiddleware.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, authorize('admin'), validateDestination, (req, res) => {
  res.json({ success: true, message: 'Destination added' });
});

export default router;
