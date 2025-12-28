import express from 'express';
import { Contact } from '../models/index.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        // Create contact message
        const contact = new Contact({
            name,
            email,
            phone,
            subject,
            message,
            status: 'new'
        });

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
        res.status(500).json({
            success: false,
            message: 'Failed to send message',
            error: error.message
        });
    }
});

// Get all contact messages (admin only)
router.get('/', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const { status } = req.query;
        const filter = {};

        if (status) filter.status = status;

        const messages = await Contact.find(filter).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: messages
        });
    } catch (error) {
        console.error('Get contact messages error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact messages',
            error: error.message
        });
    }
});

// Update message status (admin only)
router.put('/:id/status', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const { status } = req.body;

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found'
            });
        }

        res.json({
            success: true,
            message: 'Status updated successfully',
            data: contact
        });
    } catch (error) {
        console.error('Update message status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update status',
            error: error.message
        });
    }
});

// Get message by ID (admin only)
router.get('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact message not found'
            });
        }

        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Get contact message error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact message',
            error: error.message
        });
    }
});

export default router;