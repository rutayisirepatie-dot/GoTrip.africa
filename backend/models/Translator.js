import mongoose from 'mongoose';

const languageDetailSchema = new mongoose.Schema({
  language: { type: String, required: true },
  level: { type: String, enum: ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'] },
  fluency: { type: Number, min: 0, max: 100 }
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

const translatorSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  country: { type: String, default: 'Rwanda' },
  city: { type: String },
  languages: [{ type: String }],
  dailyRate: { type: Number, required: true },
  experienceYears: { type: Number, min: 0 },
  bio: { type: String },
  description: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  available: { type: Boolean, default: true },
  specializations: [{ type: String }],
  image: { type: String },
  certifications: [{ type: String }],
  services: [{ type: String }],
  equipment: [{ type: String }],
  education: [{ type: String }],
  languagesDetail: [languageDetailSchema],
  industries: [{ type: String }],
  availability: availabilitySchema,
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Virtual for total languages
translatorSchema.virtual('totalLanguages').get(function() {
  return this.languages.length;
});

// Virtual for formatted rate
translatorSchema.virtual('formattedRate').get(function() {
  return `$${this.dailyRate}/day`;
});

// Virtual for experience level
translatorSchema.virtual('experienceLevel').get(function() {
  if (this.experienceYears >= 10) return 'Expert';
  if (this.experienceYears >= 5) return 'Senior';
  if (this.experienceYears >= 2) return 'Intermediate';
  return 'Junior';
});

// Indexes
translatorSchema.index({ rating: -1 });
translatorSchema.index({ dailyRate: 1 });
translatorSchema.index({ specializations: 1 });
translatorSchema.index({ languages: 1 });
translatorSchema.index({ available: 1 });

const Translator = mongoose.model('Translator', translatorSchema);
export default Translator;