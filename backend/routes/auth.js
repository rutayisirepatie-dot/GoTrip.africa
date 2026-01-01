// backend/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// ======================
// REGISTER
// ======================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, country, role, adminSecret } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Only allow admin creation if secret matches
    let assignedRole = 'user';
    if (role === 'admin') {
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ success: false, message: 'Invalid admin secret' });
      }
      assignedRole = 'admin';
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone,
      country,
      role: assignedRole,
      status: 'active'
    });
    await user.save();

    // Ensure JWT secret exists
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET missing in environment variables');

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: process.env.JWT_EXPIRE || '7d' });

    // Prepare response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
});

// ======================
// LOGIN
// ======================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    if (user.status !== 'active') return res.status(401).json({ success: false, message: 'Account is inactive' });

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET missing in environment variables');

    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: process.env.JWT_EXPIRE || '7d' });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ success: true, message: 'Login successful', token, user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
});

// ======================
// VERIFY TOKEN
// ======================
router.get('/verify', authenticateToken, async (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;