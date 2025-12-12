const express = require('express');
const router = express.Router();
const NewsletterSubscription = require('../models/NewsletterSubscription');

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email, source = 'website', subscription_type = 'weekly_newsletter' } = req.body;
    
    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }
    
    // Check if already subscribed
    let subscription = await NewsletterSubscription.findOne({ email });
    
    if (subscription) {
      // Update existing subscription
      subscription.status = 'active';
      subscription.subscriptionType = subscription_type;
      subscription.source = source;
      subscription.emailCount += 1;
      subscription.lastEmailSent = new Date();
      
      await subscription.save();
    } else {
      // Create new subscription
      subscription = new NewsletterSubscription({
        email,
        source,
        subscriptionType: subscription_type,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        referrer: req.get('referer')
      });
      
      await subscription.save();
    }
    
    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: subscription
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again.',
      error: error.message
    });
  }
});

// Get all subscribers (admin only)
router.get('/subscribers', async (req, res) => {
  try {
    // Simple admin check (in production, use proper auth)
    const { admin_key } = req.query;
    if (admin_key !== process.env.ADMIN_KEY) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    
    const subscriptions = await NewsletterSubscription.find({ status: 'active' })
      .sort({ subscribedAt: -1 });
    
    res.json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
    });
    
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Unsubscribe
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    const subscription = await NewsletterSubscription.findOne({ email });
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our subscription list'
      });
    }
    
    subscription.status = 'unsubscribed';
    subscription.unsubscribedAt = new Date();
    await subscription.save();
    
    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
    
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe',
      error: error.message
    });
  }
});

module.exports = router;