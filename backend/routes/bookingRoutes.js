// backend/routes/bookingRoutes.js
import { Router } from 'express';
import { validateBooking } from '../middleware/validationMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, validateBooking, (req, res) => {
  res.json({ success: true, message: 'Booking created' });
});

export default router;