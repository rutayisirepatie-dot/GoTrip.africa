import mongoose from 'mongoose';

const tripPlanSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `TRIP-${Date.now().toString().slice(-6)}`
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userEmail: String,
  startDate: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true,
    enum: ['3-5 days', '6-8 days', '9-12 days', '13+ days']
  },
  travelers: {
    type: Number,
    required: true,
    min: 1
  },
  budget: {
    type: String,
    required: true,
    enum: ['budget', 'midrange', 'luxury']
  },
  interests: [String],
  message: String,
  status: {
    type: String,
    enum: ['review', 'processing', 'completed', 'cancelled'],
    default: 'review'
  },
  assignedTo: String,
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
      breakdown: [{
        item: String,
        cost: Number
      }]
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TripPlan', tripPlanSchema);