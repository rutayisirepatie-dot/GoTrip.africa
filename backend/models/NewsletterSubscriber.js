import mongoose from 'mongoose';
import validator from 'validator';

const newsletterSubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  
  source: {
    type: String,
    default: 'website',
    enum: ['website', 'footer', 'modal', 'booking', 'admin']
  },
  
  subscriptionType: {
    type: String,
    default: 'weekly_newsletter',
    enum: ['weekly_newsletter', 'monthly_updates', 'special_offers', 'all']
  },
  
  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced', 'complaint'],
    default: 'active'
  },
  
  subscribedAt: { type: Date, default: Date.now },
  unsubscribedAt: Date,
  lastEmailSent: Date,
  
  emailCount: { type: Number, default: 0 },
  
  // Additional info
  name: String,
  
  preferences: {
    destinations: Boolean,
    guides: Boolean,
    accommodations: Boolean,
    deals: Boolean
  },
  
  // Analytics
  ipAddress: String,
  userAgent: String,
  referrer: String
  
}, { timestamps: true });

// Indexes
newsletterSubscriptionSchema.index({ email: 1 }, { unique: true });
newsletterSubscriptionSchema.index({ status: 1 });
newsletterSubscriptionSchema.index({ subscribedAt: -1 });

// ✅ Hot-reload safe export
const NewsletterSubscription = mongoose.models.NewsletterSubscription || mongoose.model('NewsletterSubscription', newsletterSubscriptionSchema);

export default NewsletterSubscription;