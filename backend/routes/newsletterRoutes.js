// backend/routes/newsletterRoutes.js
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger.js';

const router = Router();

router.post('/subscribe',
  body('email').isEmail().withMessage('Valid email required'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    res.json({ success: true, message: 'Subscribed to newsletter' });
  }
);

export default router;