import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ------------------ USER SCHEMA ------------------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'guide', 'translator'], default: 'user' },
  status: { type: String, enum: ['active', 'inactive', 'pending'], default: 'active' },
  address: String,
  dob: Date,
  passport: String,
  preferences: String,
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) { next(error); }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ------------------ BOOKING SCHEMA ------------------
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: String,
  userEmail: String,
  serviceType: { type: String, enum: ['destination', 'guide', 'translator', 'accommodation', 'package'], required: true },
  serviceId: mongoose.Schema.Types.ObjectId,
  serviceName: { type: String, required: true },
  bookingReference: { type: String, unique: true, required: true },
  date: { type: Date, required: true },
  endDate: Date,
  duration: { type: Number, required: true },
  travelers: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
  paymentMethod: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

// ------------------ TRIP PLAN SCHEMA ------------------
const tripPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: String,
  userEmail: String,
  tripReference: { type: String, unique: true, required: true },
  startDate: { type: Date, required: true },
  duration: { type: String, required: true },
  travelers: { type: Number, required: true, min: 1 },
  budget: { type: String, enum: ['budget', 'midrange', 'luxury'], required: true },
  interests: [String],
  message: String,
  status: { type: String, enum: ['review', 'processing', 'completed', 'cancelled'], default: 'review' },
  assignedTo: { type: String, ref: 'User' },
  assignedAt: Date,
  itinerary: {
    days: [{
      day: Number,
      title: String,
      activities: [{
        time: String,
        description: String,
        location: String,
        icon: String
      }]
    }],
    total_cost: {
      total: Number,
      breakdown: {
        accommodation: Number,
        transport: Number,
        activities: Number,
        meals: Number
      }
    }
  },
  createdAt: { type: Date, default: Date.now }
});

// ------------------ GUIDE SCHEMA ------------------
const guideSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  languages: [String],
  specialty: String,
  experience: String,
  rating: { type: Number, min: 0, max: 5, default: 0 },
  price: String,
  dailyRate: Number,
  image: String,
  certifications: [String],
  experienceYears: Number,
  available: { type: Boolean, default: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

guideSchema.virtual('name').get(function() { return `${this.firstName} ${this.lastName}`; });

// ------------------ TRANSLATOR SCHEMA ------------------
const translatorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  languages: [String],
  specialty: String,
  rating: { type: Number, min: 0, max: 5, default: 0 },
  price: String,
  dailyRate: Number,
  image: String,
  experience: String,
  certifications: [String],
  experienceYears: Number,
  available: { type: Boolean, default: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

translatorSchema.virtual('name').get(function() { return `${this.firstName} ${this.lastName}`; });

// ------------------ DESTINATION SCHEMA ------------------
const destinationSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  image: String,
  features: [String],
  rating: { type: Number, min: 0, max: 5, default: 0 },
  price: String,
  basePrice: Number,
  duration: String,
  bestSeason: [String],
  createdAt: { type: Date, default: Date.now }
});

// ------------------ ACCOMMODATION SCHEMA ------------------
const accommodationSchema = new mongoose.Schema({
  name: String,
  location: String,
  type: String,
  description: String,
  image: String,
  features: [String],
  price: String,
  dailyRate: Number,
  rating: { type: Number, min: 0, max: 5, default: 0 },
  category: { type: String, enum: ['budget', 'midrange', 'luxury'], default: 'midrange' },
  capacity: Number,
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// ------------------ BLOG SCHEMA ------------------
const blogSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  date: String,
  category: String,
  image: String,
  readTime: String,
  author: String,
  tags: [String],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// ------------------ NEWSLETTER SCHEMA ------------------
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  subscribedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'unsubscribed'], default: 'active' }
});

// ------------------ CONTACT SCHEMA ------------------
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

// ------------------ CREATE MODELS (HOT-RELOAD SAFE) ------------------
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export const TripPlan = mongoose.models.TripPlan || mongoose.model('TripPlan', tripPlanSchema);
export const Guide = mongoose.models.Guide || mongoose.model('Guide', guideSchema);
export const Translator = mongoose.models.Translator || mongoose.model('Translator', translatorSchema);
export const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);
export const Accommodation = mongoose.models.Accommodation || mongoose.model('Accommodation', accommodationSchema);
export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);
export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);