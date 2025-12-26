import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'demo-secret',
    { expiresIn: '7d' }
  );
};

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: 'Email already exists' });

    const user = await User.create({ name, email, password });
    res.status(201).json({ 
      success: true, 
      token: generateToken(user), 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    res.json({ 
      success: true, 
      token: generateToken(user), 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// VERIFY TOKEN
router.get('/verify', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, user });
});

export default router;