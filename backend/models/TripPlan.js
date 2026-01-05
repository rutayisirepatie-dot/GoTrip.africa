import mongoose from 'mongoose';

const tripPlanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
    guides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guide' }],
    translators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Translator' }],
    startDate: Date,
    endDate: Date,
    totalCost: Number,
    status: {
      type: String,
      enum: ['planned','ongoing','completed','cancelled'],
      default: 'planned'
    },
    notes: String
  },
  {
    collection: 'tripplans', // explicit binding
    timestamps: true // createdAt + updatedAt
  }
);

// Optional: Validate endDate ≥ startDate
tripPlanSchema.pre('validate', function(next) {
  if (this.endDate && this.startDate && this.endDate < this.startDate) {
    return next(new Error('End date must be after start date'));
  }
  next();
});

const TripPlan = mongoose.models.TripPlan || mongoose.model('TripPlan', tripPlanSchema);
export default TripPlan;