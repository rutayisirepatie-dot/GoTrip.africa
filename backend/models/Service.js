import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// ✅ Hot-reload safe export
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;