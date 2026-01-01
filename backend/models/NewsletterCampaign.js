import mongoose from 'mongoose';

const newsletterCampaignSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  content: { type: String, required: true },
  sentAt: { type: Date },
  status: { type: String, enum: ['draft','scheduled','sent'], default: 'draft' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NewsletterSubscriber' }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// ✅ Hot-reload safe export
const NewsletterCampaign = mongoose.models.NewsletterCampaign || mongoose.model('NewsletterCampaign', newsletterCampaignSchema);

export default NewsletterCampaign;