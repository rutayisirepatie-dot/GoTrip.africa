import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Destination name is required'],
    trim: true,
    index: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  detailedDescription: String,
  mainImage: {
    type: String,
    required: [true, 'Main image is required']
  },
  gallery: [String],
  videoUrl: String,
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
  basePrice: {
    type: Number,
    required: [true, 'Base price is required']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'RWF']
  },
  duration: String,
  difficulty: String,
  altitude: String,
  bestSeason: String,
  permitsRequired: {
    type: Boolean,
    default: false
  },
  permitPrice: Number,
  groupSize: String,
  minimumAge: mongoose.Schema.Types.Mixed,
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
  trending: {
    type: Boolean,
    default: false
  },
  specialOffer: {
    type: Boolean,
    default: false
  },
  specialOfferText: String,
  highlights: [String],
  activities: [{
    name: String,
    icon: String,
    description: String,
    duration: String,
    difficulty: String,
    priceIncluded: Boolean,
    additionalCost: Number
  }],
  includedServices: [String],
  excludedServices: [String],
  conservationInfo: String,
  conservationImpact: mongoose.Schema.Types.Mixed,
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
  safetyRating: Number,
  accessibility: mongoose.Schema.Types.Mixed,
  statistics: mongoose.Schema.Types.Mixed,
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

// Indexes for performance
destinationSchema.index({ slug: 1, available: 1 });
destinationSchema.index({ featured: 1, available: 1 });
destinationSchema.index({ rating: -1 });
destinationSchema.index({ basePrice: 1 });
destinationSchema.index({ tags: 1 });
destinationSchema.index({ location: 'text', name: 'text', description: 'text' });

// Virtual for average rating
destinationSchema.virtual('averageRating').get(function() {
  return this.totalReviews > 0 ? (this.rating / this.totalReviews).toFixed(1) : 0;
});

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;