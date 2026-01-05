import mongoose from 'mongoose';
import validator from 'validator';

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid email'],
    },
    name: String,
    status: {
      type: String,
      enum: ['active', 'unsubscribed'],
      default: 'active',
    },
    subscribedAt: { type: Date, default: Date.now },
  },
  {
    collection: 'newsletters', // 🔑 bind to the exact Atlas collection
  }
);

const Newsletter =
  mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);

export default Newsletter;