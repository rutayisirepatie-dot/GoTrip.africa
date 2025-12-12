import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  languages: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Guide', guideSchema);