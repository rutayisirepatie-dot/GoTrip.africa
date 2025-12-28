import mongoose from 'mongoose';
import validator from 'validator';

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },

  subject: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200
  },

  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 5000
  },

  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived', 'spam'],
    default: 'new'
  },

  category: {
    type: String,
    enum: ['general', 'booking', 'complaint', 'suggestion', 'partnership', 'other'],
    default: 'general'
  },

  urgency: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },

  source: {
    type: String,
    default: 'contact-page'
  },

  ipAddress: String,
  userAgent: String

}, { timestamps: true });

// Indexes
contactMessageSchema.index({ status: 1, createdAt: -1 });
contactMessageSchema.index({ email: 1 });
contactMessageSchema.index({ category: 1 });

const Contact = mongoose.model('Contact', contactMessageSchema);

export default Contact; // ✅ REQUIRED