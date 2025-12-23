// backend/middleware/validationMiddleware.js
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger.js';

/**
 * Handles validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

/**
 * Guide validation middleware
 */
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

  handleValidationErrors,
];

/**
 * Accommodation validation middleware
 */
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

  handleValidationErrors,
];

/**
 * Blog validation middleware
 */
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

  handleValidationErrors,
];

/**
 * User validation middleware (example)
 */
export const validateUser = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Valid email is required'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  handleValidationErrors,
];

/**
 * Booking validation middleware (example)
 */
export const validateBooking = [
  body('userId')
    .notEmpty()
    .withMessage('User ID is required'),

  body('tripId')
    .notEmpty()
    .withMessage('Trip ID is required'),

  body('date')
    .notEmpty()
    .withMessage('Booking date is required')
    .isISO8601()
    .withMessage('Date must be valid'),

  handleValidationErrors,
];

/**
 * Destination validation middleware (example)
 */
export const validateDestination = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Destination name is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  handleValidationErrors,
];
