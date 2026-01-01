const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sendMail } = require('../utils/mailer');
const { resetPassword } = require('../emails/templates');

const router = express.Router();

// Request reset
router.post('/forgot', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 min
  await user.save();

  const link = `${process.env.BASE_URL}/reset-password/${token}`;
  await sendMail(user.email, 'Reset Password', resetPassword(link));
  res.json({ message: 'Reset email sent' });
});

// Reset password
router.post('/reset/:token', async (req, res) => {
  const user = await User.findOne({ resetToken: req.params.token, resetTokenExpiry: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Token expired or invalid' });

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  res.json({ message: 'Password updated' });
});

module.exports = router;