import mongoose from 'mongoose';

const amenitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  included: { type: Boolean, default: true },
  icon: { type: String }
});

const roomTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, default: 2 }
});

const coordinateSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
});

const accommodationSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  amenities: [amenitySchema],
  mainImage: { type: String, required: true },
  images: [{ type: String }],
  available: { type: Boolean, default: true },
  contactPhone: { type: String },
  contactEmail: { type: String },
  maxGuests: { type: Number, default: 2 },
  roomTypes: [roomTypeSchema],
  features: [{ type: String }],
  policies: [{ type: String }],
  coordinates: coordinateSchema,
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Virtual for formatted price
accommodationSchema.virtual('formattedPrice').get(function() {
  return `$${this.pricePerNight}/night`;
});

// Virtual for included amenities
accommodationSchema.virtual('includedAmenities').get(function() {
  return this.amenities.filter(a => a.included);
});

// Virtual for excluded amenities
accommodationSchema.virtual('excludedAmenities').get(function() {
  return this.amenities.filter(a => !a.included);
});

// Indexes
accommodationSchema.index({ rating: -1 });
accommodationSchema.index({ pricePerNight: 1 });
accommodationSchema.index({ type: 1 });
accommodationSchema.index({ available: 1 });
accommodationSchema.index({ 'coordinates': '2dsphere' });

const Accommodation = mongoose.model('Accommodation', accommodationSchema);
export default Accommodation;