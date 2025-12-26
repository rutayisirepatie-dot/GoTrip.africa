import mongoose from 'mongoose';

const tripPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planReference: {
    type: String,
    unique: true,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  travelers: {
    type: Number,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  interests: [{
    type: String
  }],
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'draft', 'sent', 'accepted', 'cancelled'],
    default: 'pending'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  itinerary: {
    type: mongoose.Schema.Types.Mixed
  },
  totalCost: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TripPlan', tripPlanSchema);