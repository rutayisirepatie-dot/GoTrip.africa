import mongoose from 'mongoose';

const translatorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  languages: [{ type: String, required: true }],
  email: { type: String, trim: true },
  phone: { type: String, trim: true },
  availability: { type: String, enum: ['full-time','part-time','on-demand'], default: 'on-demand' },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviews: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, comment: String, rating: Number }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Translator', translatorSchema);