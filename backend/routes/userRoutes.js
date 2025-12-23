// backend/routes/userRoutes.js
import { Router } from 'express';
import { validateUser } from '../middleware/validationMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', validateUser, (req, res) => {
  res.json({ success: true, message: 'User registered' });
});

router.get('/profile', protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;