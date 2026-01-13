import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  description: { type: String },
  duration: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'] }
});

const featureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const coordinateSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
});

const destinationSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, default: 'Rwanda' },
  description: { type: String, required: true },
  mainImage: { type: String, required: true },
  images: [{ type: String }],
  rating: { type: Number, min: 0, max: 5, default: 0 },
  basePrice: { type: Number, required: true },
  duration: { type: String },
  difficulty: { type: String },
  bestSeason: { type: String },
  activities: [activitySchema],
  features: [featureSchema],
  highlights: [{ type: String }],
  includes: [{ type: String }],
  excludes: [{ type: String }],
  travelTips: [{ type: String }],
  coordinates: coordinateSchema,
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted price
destinationSchema.virtual('formattedPrice').get(function() {
  return `$${this.basePrice}`;
});

// Virtual for rating percentage
destinationSchema.virtual('ratingPercentage').get(function() {
  return (this.rating / 5) * 100;
});

// Indexes for better query performance
destinationSchema.index({ rating: -1 });
destinationSchema.index({ country: 1 });
destinationSchema.index({ tags: 1 });
destinationSchema.index({ 'coordinates': '2dsphere' });

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;