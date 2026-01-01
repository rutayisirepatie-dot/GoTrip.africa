// backend/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// ====================
// Middleware to protect routes
// ====================
export const authenticateToken = async (req, res, next) => {
  try {
    // Ensure JWT secret exists
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('Ivan45@patie');
      return res.status(500).json({
        success: false,
        message: 'Server misconfiguration: JWT secret is missing'
      });
    }

    let token;

    // Extract token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Access token required' });
    }

    // Verify token
    const decoded = jwt.verify(token, secret);

    // Fetch user
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({
      success: false,
      message: err.name === 'TokenExpiredError'
        ? 'Token expired. Please log in again.'
        : 'Invalid token'
    });
  }
};

// ====================
// Role-based authorization
// ====================
export const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: `User role '${req.user.role}' is not authorized to access this resource`
    });
  }

  next();
};