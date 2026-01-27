import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Accommodation name is required'],
    trim: true,
    index: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  type: {
    type: String,
    required: [true, 'Type is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
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
  pricePerNight: {
    type: Number,
    required: [true, 'Price per night is required']
  },
  currency: {
    type: String,
    default: 'USD'
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
  amenities: [{
    name: String,
    included: Boolean,
    icon: String,
    category: String
  }],
  roomTypes: [{
    name: String,
    description: String,
    maxGuests: Number,
    size: String,
    beds: String,
    price: Number,
    features: [String]
  }],
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
  totalRooms: {
    type: Number,
    required: [true, 'Total rooms is required']
  },
  roomsAvailable: {
    type: Number,
    default: function() {
      return this.totalRooms;
    }
  },
  checkInTime: {
    type: String,
    default: '14:00'
  },
  checkOutTime: {
    type: String,
    default: '11:00'
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required']
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required']
  },
  website: String,
  address: String,
  sustainability: String,
  sustainabilityDetails: mongoose.Schema.Types.Mixed,
  policies: mongoose.Schema.Types.Mixed,
  distanceToAttractions: mongoose.Schema.Types.Mixed,
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
  awards: [String],
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
accommodationSchema.index({ slug: 1, available: 1 });
accommodationSchema.index({ type: 1, category: 1, available: 1 });
accommodationSchema.index({ pricePerNight: 1 });
accommodationSchema.index({ rating: -1 });
accommodationSchema.index({ location: 'text', name: 'text' });
accommodationSchema.index({ tags: 1 });

// Virtual for occupancy rate
accommodationSchema.virtual('occupancyRate').get(function() {
  if (this.totalRooms > 0) {
    return Math.round(((this.totalRooms - this.roomsAvailable) / this.totalRooms) * 100);
  }
  return 0;
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

export default Accommodation;