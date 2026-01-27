import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST create contact message
router.post('/', async (req, res) => {
  try {
    const contactData = req.body;
    
    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const contact = new Contact(contactData);
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        submittedAt: contact.submittedAt
      }
    });
  } catch (error) {
    console.error('❌ Create contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

export default router;