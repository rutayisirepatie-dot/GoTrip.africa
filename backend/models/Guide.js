import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Guide name is required'],
    trim: true,
    index: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required']
  },
  whatsapp: String,
  country: {
    type: String,
    default: 'Rwanda'
  },
  city: {
    type: String,
    default: 'Kigali'
  },
  address: String,
  biography: {
    type: String,
    required: [true, 'Biography is required']
  },
  detailedBio: String,
  languages: [{
    language: String,
    level: String,
    flag: String,
    certification: String,
    speaking: Number,
    reading: Number,
    writing: Number,
    years: mongoose.Schema.Types.Mixed
  }],
  experienceYears: {
    type: Number,
    required: [true, 'Experience years is required']
  },
  totalTours: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  dailyRate: {
    type: Number,
    required: [true, 'Daily rate is required']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  minimumDays: {
    type: Number,
    default: 1
  },
  maximumGroupSize: {
    type: Number,
    default: 8
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  gallery: [String],
  certifications: [{
    name: String,
    issuingAuthority: String,
    year: Number,
    validUntil: String
  }],
  education: [{
    degree: String,
    institution: String,
    year: Number,
    field: String
  }],
  specialties: [{
    name: String,
    level: String,
    years: Number,
    description: String
  }],
  destinationsExpertise: [String],
  available: {
    type: Boolean,
    default: true,
    index: true
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  },
  instantBooking: {
    type: Boolean,
    default: false
  },
  responseRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  responseTime: String,
  workingHours: mongoose.Schema.Types.Mixed,
  equipmentProvided: [String],
  clientTypes: [String],
  reviewSummary: mongoose.Schema.Types.Mixed,
  recentReviews: [{
    clientName: String,
    country: String,
    rating: Number,
    date: Date,
    comment: String,
    tour: String
  }],
  socialMedia: mongoose.Schema.Types.Mixed,
  tags: [String],
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  views: {
    type: Number,
    default: 0
  },
  bookings: {
    type: Number,
    default: 0
  },
  availability: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
guideSchema.index({ slug: 1, available: 1 });
guideSchema.index({ available: 1, featured: 1 });
guideSchema.index({ rating: -1 });
guideSchema.index({ experienceYears: -1 });
guideSchema.index({ dailyRate: 1 });
guideSchema.index({ 'languages.language': 1 });
guideSchema.index({ destinationsExpertise: 1 });

const Guide = mongoose.model('Guide', guideSchema);

export default Guide;