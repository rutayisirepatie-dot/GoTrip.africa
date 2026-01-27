import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  status: {
    type: String,
    default: 'subscribed',
    enum: ['subscribed', 'unsubscribed', 'bounced']
  },
  source: {
    type: String,
    default: 'website'
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  unsubscribedAt: Date,
  metadata: mongoose.Schema.Types.Mixed,
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
newsletterSchema.index({ email: 1, status: 1 });
newsletterSchema.index({ subscribedAt: -1 });

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

export default Newsletter;