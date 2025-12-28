// routes/contact.js
import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const contact = new Contact({
      name,
      email,
      message,
      submittedAt: new Date()
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message received successfully',
      data: {
        reference: `CONTACT-${contact._id}`,
        status: 'received'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;