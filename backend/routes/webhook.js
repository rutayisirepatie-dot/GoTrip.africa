// backend/routes/webhookRoutes.js
import express from 'express';

const router = express.Router();

// Payment webhook endpoint (for future payment integration)
router.post('/payment', (req, res) => {
  console.log('Payment webhook received:', req.body);
  res.status(200).json({ success: true, message: 'Webhook received' });
});

// Newsletter subscription webhook
router.post('/newsletter', (req, res) => {
  console.log('Newsletter subscription:', req.body);
  res.status(200).json({ success: true });
});

// Booking confirmation webhook
router.post('/booking-confirmation', (req, res) => {
  console.log('Booking confirmation webhook:', req.body);
  res.status(200).json({ success: true });
});

export default router;