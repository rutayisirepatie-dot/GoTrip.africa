import { body, validationResult } from 'express-validator';
import logger from '../utils/logger.js';

// Guide validation middleware
export const validateGuide = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Valid email is required'),

  body('phone')
    .optional({ checkFalsy: true })
    .isMobilePhone()
    .withMessage('Valid phone number required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

// Example: Accommodation validation middleware
export const validateAccommodation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Accommodation name is required')
    .isLength({ max: 200 })
    .withMessage('Name cannot exceed 200 characters'),

  body('destination')
    .notEmpty()
    .withMessage('Destination is required'),

  body('priceRange.min')
    .notEmpty()
    .withMessage('Minimum price is required')
    .isNumeric()
    .withMessage('Minimum price must be a number'),

  body('priceRange.max')
    .notEmpty()
    .withMessage('Maximum price is required')
    .isNumeric()
    .withMessage('Maximum price must be a number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
// Blog validation middleware
export const validateBlog = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),

  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];