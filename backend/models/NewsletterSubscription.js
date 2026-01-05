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
  
  name: {
    type: String,
    trim: true,
    maxlength: 100
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
  
  preferences: {
    destinations: { type: Boolean, default: true },
    guides: { type: Boolean, default: true },
    accommodations: { type: Boolean, default: true },
    deals: { type: Boolean, default: true }
  },
  
  // Analytics
  ipAddress: String,
  userAgent: String,
  referrer: String

}, { timestamps: true });

// -------------------- INDEXES --------------------
newsletterSubscriptionSchema.index({ email: 1 }, { unique: true });
newsletterSubscriptionSchema.index({ status: 1 });
newsletterSubscriptionSchema.index({ subscribedAt: -1 });

// -------------------- VIRTUALS --------------------
// Check if currently active
newsletterSubscriptionSchema.virtual('isActive').get(function() {
  return this.status === 'active';
});

// -------------------- METHODS --------------------
// Mark as unsubscribed
newsletterSubscriptionSchema.methods.unsubscribe = async function(reason = '') {
  this.status = 'unsubscribed';
  this.unsubscribedAt = new Date();
  if (reason) this.unsubscribeReason = reason;
  await this.save();
};

// Mark as active/resubscribe
newsletterSubscriptionSchema.methods.resubscribe = async function() {
  this.status = 'active';
  this.unsubscribedAt = null;
  await this.save();
};

// ✅ Hot-reload safe export
const NewsletterSubscription = mongoose.models.NewsletterSubscription || mongoose.model('NewsletterSubscription', newsletterSubscriptionSchema);

export default NewsletterSubscription;