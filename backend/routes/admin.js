// backend/routes/admin.js
import express from 'express';
import { User, Booking, TripPlan } from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// Protect all admin routes
router.use(authenticateToken, authorizeAdmin);

// ======================
// GET all users
// ======================
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message });
  }
});

// ======================
// CREATE new user (admin only)
// ======================
router.post('/users', async (req, res) => {
  try {
    const { name, email, password, phone, country, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      phone,
      country,
      role: role || 'user'
    });

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ success: true, message: 'User created successfully', data: userResponse });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ success: false, message: 'Failed to create user', error: error.message });
  }
});

// ======================
// PROMOTE USER TO ADMIN
// ======================
router.post('/make-admin', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.role === 'admin') return res.status(400).json({ success: false, message: 'User is already an admin' });

    user.role = 'admin';
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ success: true, message: `${user.name} has been promoted to admin`, data: userResponse });
  } catch (error) {
    console.error('Make admin error:', error);
    res.status(500).json({ success: false, message: 'Failed to promote user', error: error.message });
  }
});

// ======================
// GET all bookings
// ======================
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: error.message });
  }
});

// ======================
// GET all trip plans
// ======================
router.get('/tripPlans', async (req, res) => {
  try {
    const tripPlans = await TripPlan.find().sort({ createdAt: -1 });
    res.json({ success: true, data: tripPlans });
  } catch (error) {
    console.error('Get trip plans error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch trip plans', error: error.message });
  }
});

export default router;