import mongoose from 'mongoose';

const tripPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User is required"]
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    destinations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination'
    }],
    startDate: {
      type: Date,
      required: [true, "Start date is required"]
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"]
    },
    duration: {
      type: String,
      required: [true, "Duration is required"]
    },
    budget: {
      type: Number,
      required: [true, "Budget is required"],
      min: [0, "Budget cannot be negative"]
    },
    travelers: {
      type: Number,
      required: [true, "Number of travelers is required"],
      min: [1, "At least 1 traveler is required"],
      max: [20, "Maximum 20 travelers allowed"]
    },
    activities: {
      type: [String], // Changed from embedded to array of strings
      default: []
    },
    status: {
      type: String,
      enum: ["draft", "planning", "booked", "completed", "cancelled"],
      default: "planning"
    },
    notes: {
      type: String, // Changed from embedded to string
      maxlength: [1000, "Notes cannot exceed 1000 characters"]
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'tripplans',
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        ret.id = doc._id.toString();
        return ret;
      }
    }
  }
);

// Virtual for formatted budget
tripPlanSchema.virtual('formattedBudget').get(function () {
  return `$${this.budget?.toFixed(2) || '0.00'}`;
});

// Virtual for duration in days
tripPlanSchema.virtual('durationDays').get(function () {
  if (!this.startDate || !this.endDate) return 0;
  const diffTime = Math.abs(this.endDate - this.startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Indexes
tripPlanSchema.index({ user: 1 });
tripPlanSchema.index({ status: 1 });
tripPlanSchema.index({ startDate: 1 });
tripPlanSchema.index({ budget: 1 });
tripPlanSchema.index({ isPublic: 1 });
tripPlanSchema.index({ createdAt: -1 });

const TripPlan = mongoose.models.TripPlan || mongoose.model('TripPlan', tripPlanSchema);

export default TripPlan;