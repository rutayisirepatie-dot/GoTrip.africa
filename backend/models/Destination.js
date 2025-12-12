import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  slug: { type: String, unique: true, lowercase: true },
  location: { type: String, required: true, trim: true },
  province: { type: String, enum: ['Kigali','Northern','Southern','Eastern','Western'], required: true },
  description: { type: String, required: true, maxlength: 2000 },
  images: [{ url: String, alt: String, isPrimary: { type: Boolean, default: false } }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Pre-save slug
destinationSchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  this.slug = this.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g,'-').replace(/--+/g,'-').trim();
  next();
});

export default mongoose.model('Destination', destinationSchema);