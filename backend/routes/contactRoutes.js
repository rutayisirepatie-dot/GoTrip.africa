// backend/routes/contactRoutes.js
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger.js';

const router = Router();

router.post('/',
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('message').notEmpty().withMessage('Message required'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    res.json({ success: true, message: 'Message received' });
  }
);

export default router;
