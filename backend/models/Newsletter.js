import mongoose from 'mongoose';
import crypto from 'crypto';

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },

  name: { type: String, trim: true },

  source: {
    type: String,
    enum: ['website', 'footer', 'modal', 'booking', 'manual'],
    default: 'website'
  },

  subscriptionType: {
    type: String,
    enum: ['weekly', 'monthly', 'promotional', 'all'],
    default: 'weekly'
  },

  status: {
    type: String,
    enum: ['active', 'unsubscribed', 'bounced', 'complained'],
    default: 'active'
  },

  preferences: {
    destinations: { type: Boolean, default: true },
    guides: { type: Boolean, default: true },
    accommodations: { type: Boolean, default: true },
    promotions: { type: Boolean, default: true },
    blog: { type: Boolean, default: true }
  },

  metadata: {
    ipAddress: String,
    userAgent: String,
    pageUrl: String,
    referral: String
  },

  unsubscribedAt: Date,
  unsubscribeReason: String,

  lastEmailSent: Date,
  emailCount: { type: Number, default: 0 },

  openRate: { type: Number, default: 0, min: 0, max: 100 },
  clickRate: { type: Number, default: 0, min: 0, max: 100 },

  tags: [String],

  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationSentAt: Date,
  verifiedAt: Date

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// INDEXES
newsletterSchema.index({ status: 1 });
newsletterSchema.index({ source: 1 });
newsletterSchema.index({ createdAt: -1 });
newsletterSchema.index({ subscriptionType: 1 });

// VIRTUALS
newsletterSchema.virtual('subscriptionAge').get(function () {
  const now = Date.now();
  const created = new Date(this.createdAt).getTime();
  return Math.floor((now - created) / (1000 * 60 * 60 * 24));
});

// METHODS
newsletterSchema.methods.unsubscribe = async function (reason = '') {
  this.status = 'unsubscribed';
  this.unsubscribedAt = new Date();
  this.unsubscribeReason = reason;
  await this.save();
};

newsletterSchema.methods.resubscribe = async function () {
  this.status = 'active';
  this.unsubscribedAt = null;
  this.unsubscribeReason = '';
  await this.save();
};

newsletterSchema.methods.generateVerificationToken = function () {
  this.verificationToken = crypto.randomBytes(32).toString('hex');
  this.verificationSentAt = new Date();
  return this.verificationToken;
};

newsletterSchema.methods.verify = async function () {
  this.isVerified = true;
  this.verifiedAt = new Date();
  this.verificationToken = null;
  await this.save();
};

// ✅ ESM export
export default mongoose.model('Newsletter', newsletterSchema);