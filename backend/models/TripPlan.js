import mongoose from 'mongoose';

const tripPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required']
  },
  country: String,
  travelDates: {
    startDate: Date,
    endDate: Date
  },
  travelers: {
    adults: {
      type: Number,
      default: 1
    },
    children: {
      type: Number,
      default: 0
    },
    total: Number
  },
  budget: {
    type: String,
    enum: ['economy', 'standard', 'luxury', 'premium']
  },
  budgetAmount: Number,
  destinations: [String],
  interests: [String],
  accommodationType: [String],
  specialRequirements: String,
  additionalInfo: String,
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'reviewing', 'quoted', 'confirmed', 'archived'],
    index: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: String,
  quote: {
    amount: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    details: String,
    submittedAt: Date
  },
  submittedAt: {
    type: Date,
    default: Date.now,
    index: true
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

// Calculate total travelers before saving
tripPlanSchema.pre('save', function(next) {
  if (this.travelers) {
    this.travelers.total = (this.travelers.adults || 0) + (this.travelers.children || 0);
  }
  next();
});

// Indexes
tripPlanSchema.index({ email: 1, submittedAt: -1 });
tripPlanSchema.index({ status: 1, submittedAt: -1 });
tripPlanSchema.index({ 'travelDates.startDate': 1 });

const TripPlan = mongoose.model('TripPlan', tripPlanSchema);

export default TripPlan;