import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: String,
  languages: [String],
  experience: String,
  rating: { type: Number, min: 0, max: 5 },
  price: String,
  dailyRate: Number,
  image: String,
  certifications: [String],
  experienceYears: Number,
  available: { type: Boolean, default: true },
  description: String
}, { timestamps: true });

const Guide = mongoose.model('Guide', guideSchema);
export default Guide;