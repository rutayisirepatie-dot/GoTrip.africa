import mongoose from 'mongoose';

const languageDetailSchema = new mongoose.Schema({
  language: { type: String, required: true },
  level: { type: String, enum: ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'] },
  fluency: { type: Number, min: 0, max: 100 }
});

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  date: { type: Date, default: Date.now }
});

const availabilitySchema = new mongoose.Schema({
  monday: { type: Boolean, default: true },
  tuesday: { type: Boolean, default: true },
  wednesday: { type: Boolean, default: true },
  thursday: { type: Boolean, default: true },
  friday: { type: Boolean, default: true },
  saturday: { type: Boolean, default: false },
  sunday: { type: Boolean, default: false }
});

const guideSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  country: { type: String, default: 'Rwanda' },
  city: { type: String },
  languages: [{ type: String }],
  experienceYears: { type: Number, min: 0 },
  dailyRate: { type: Number, required: true },
  description: { type: String, required: true },
  bio: { type: String },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  available: { type: Boolean, default: true },
  image: { type: String },
  certifications: [{ type: String }],
  specialty: { type: String },
  areas: [{ type: String }],
  equipment: [{ type: String }],
  education: [{ type: String }],
  awards: [{ type: String }],
  languagesDetail: [languageDetailSchema],
  services: [{ type: String }],
  availability: availabilitySchema,
  reviews: [reviewSchema],
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Virtual for full name
guideSchema.virtual('fullName').get(function() {
  return this.name;
});

// Virtual for formatted rate
guideSchema.virtual('formattedRate').get(function() {
  return `$${this.dailyRate}/day`;
});

// Virtual for experience level
guideSchema.virtual('experienceLevel').get(function() {
  if (this.experienceYears >= 10) return 'Expert';
  if (this.experienceYears >= 5) return 'Senior';
  if (this.experienceYears >= 2) return 'Intermediate';
  return 'Junior';
});

// Indexes
guideSchema.index({ rating: -1 });
guideSchema.index({ dailyRate: 1 });
guideSchema.index({ specialty: 1 });
guideSchema.index({ languages: 1 });
guideSchema.index({ available: 1 });

const Guide = mongoose.model('Guide', guideSchema);
export default Guide;