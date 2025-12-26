// backend/routes/tripPlanRoutes.js
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { protect, authorize } from '../middleware/authMiddleware.js';
import logger from '../utils/logger.js';

const router = Router();

router.post('/',
  protect,
  authorize('admin'),
  body('name').notEmpty().withMessage('Trip name required'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(JSON.stringify(errors.array()));
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    res.json({ success: true, message: 'Trip created' });
  }
);

export default router;