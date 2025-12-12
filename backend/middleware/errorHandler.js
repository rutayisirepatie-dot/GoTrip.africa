import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Log error
  logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  logger.error(err.stack);
  
  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    ...(err.errors && { errors: err.errors }),
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  };
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    response.message = 'Validation Error';
    response.errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message,
      value: e.value
    }));
    return res.status(400).json(response);
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    response.message = 'Duplicate field value entered';
    const field = Object.keys(err.keyValue)[0];
    response.errors = [{ field, message: `${field} must be unique` }];
    return res.status(400).json(response);
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    response.message = 'Invalid token';
    return res.status(401).json(response);
  }
  
  if (err.name === 'TokenExpiredError') {
    response.message = 'Token expired';
    return res.status(401).json(response);
  }
  
  // Default error
  res.status(statusCode).json(response);
};

export default errorHandler;