import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  type: { type: String },
  description: { type: String },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  priceRange: { min: Number, max: Number, currency: { type: String, default: 'USD' } },
  location: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Pre-save slug
accommodationSchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  this.slug = this.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g,'-').replace(/--+/g,'-').trim();
  next();
});

export default mongoose.model('Accommodation', accommodationSchema);