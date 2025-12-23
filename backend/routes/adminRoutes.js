// backend/routes/adminRoutes.js
import { Router } from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

// Admin root
router.get('/', protect, authorize('admin'), (req, res) => {
  res.json({ success: true, message: 'Welcome to the Admin Panel' });
});

// Admin Dashboard
router.get('/dashboard', protect, authorize('admin'), (req, res) => {
  // Example JSON response
  res.json({
    success: true,
    message: 'Admin Dashboard Access',
    stats: {
      totalUsers: 120,
      totalTrips: 45,
      totalBookings: 78,
    },
  });

  // If using EJS:
  // res.render('admin/dashboard', { user: req.user, stats: { ... } });
});

// Manage Users
router.get('/users', protect, authorize('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'User management access',
    users: [
      { id: 1, name: 'Alice', role: 'user' },
      { id: 2, name: 'Bob', role: 'user' },
    ],
  });

  // If using EJS:
  // res.render('admin/users', { users: [...], user: req.user });
});

// Settings / Configuration
router.get('/settings', protect, authorize('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Admin settings access',
    settings: {
      siteName: 'Go Trip',
      maintenanceMode: false,
    },
  });

  // If using EJS:
  // res.render('admin/settings', { settings: {...}, user: req.user });
});

export default router;