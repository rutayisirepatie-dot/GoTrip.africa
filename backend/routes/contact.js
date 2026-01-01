// backend/routes/contact.js
import express from 'express';
import { Contact } from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// ====================
// CREATE: Submit contact form (public)
// ====================
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    const contact = new Contact({ name, email, phone, subject, message, status: 'new' });
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        reference: `CONTACT-${contact._id.toString().slice(-6)}`,
        status: 'received'
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
});

// ====================
// READ: Get all messages (admin only)
// ====================
router.get('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const messages = await Contact.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages', error: error.message });
  }
});

// ====================
// READ: Get single message by ID (admin only)
// ====================
router.get('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid message ID' });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });

    res.json({ success: true, data: contact });
  } catch (error) {
    console.error('Get contact message error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch message', error: error.message });
  }
});

// ====================
// UPDATE: Update message status or content (admin only)
// ====================
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid message ID' });

    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });

    const { status, name, email, phone, subject, message } = req.body;

    if (status) contact.status = status;
    if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;
    if (subject) contact.subject = subject;
    if (message) contact.message = message;

    await contact.save();
    res.json({ success: true, message: 'Contact message updated', data: contact });
  } catch (error) {
    console.error('Update contact message error:', error);
    res.status(500).json({ success: false, message: 'Failed to update message', error: error.message });
  }
});

// ====================
// DELETE: Remove message (admin only)
// ====================
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid message ID' });

    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });

    await contact.remove();
    res.json({ success: true, message: 'Contact message deleted' });
  } catch (error) {
    console.error('Delete contact message error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete message', error: error.message });
  }
});

export default router;