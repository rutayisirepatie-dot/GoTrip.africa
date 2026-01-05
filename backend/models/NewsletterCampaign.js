import mongoose from 'mongoose';

const newsletterCampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  sentAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sent'],
    default: 'draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewsletterSubscriber'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// -------------------- INDEXES --------------------
newsletterCampaignSchema.index({ status: 1, sentAt: -1 });
newsletterCampaignSchema.index({ createdBy: 1 });
newsletterCampaignSchema.index({ isActive: 1 });

// -------------------- PRE-SAVE HOOK --------------------
// Ensure scheduled campaigns have a future sentAt date
newsletterCampaignSchema.pre('save', function(next) {
  if (this.status === 'scheduled') {
    if (!this.sentAt) {
      return next(new Error('Scheduled campaigns must have a sentAt date.'));
    }
    if (this.sentAt < new Date()) {
      return next(new Error('Scheduled campaigns must have a future sentAt date.'));
    }
  }
  next();
});

// -------------------- VIRTUALS --------------------
// Count of recipients
newsletterCampaignSchema.virtual('recipientCount').get(function() {
  return this.recipients ? this.recipients.length : 0;
});

// ✅ Hot-reload safe export
const NewsletterCampaign = mongoose.models.NewsletterCampaign || mongoose.model('NewsletterCampaign', newsletterCampaignSchema);

export default NewsletterCampaign;