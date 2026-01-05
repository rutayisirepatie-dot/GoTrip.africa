import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: 'contacts', // 🔑 EXPLICIT binding
  }
);

const Contact =
  mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;