const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// Submit contact message
router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message, category = 'general' } = req.body;
    
    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }
    
    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }
    
    // Create contact message
    const contactMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
      category,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      source: req.get('origin') || 'website'
    });
    
    await contactMessage.save();
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you within 24 hours.',
      data: contactMessage
    });
    
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.',
      error: error.message
    });
  }
});

// Get contact messages (admin only)
router.get('/messages', async (req, res) => {
  try {
    // Simple admin check
    const { admin_key } = req.query;
    if (admin_key !== process.env.ADMIN_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    const { status, category, page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    
    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await ContactMessage.countDocuments(query);
    
    res.json({
      success: true,
      data: messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;