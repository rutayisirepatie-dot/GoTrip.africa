const mongoose = require('mongoose');

const tripPlanSchema = new mongoose.Schema({
  // User information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  
  phone: {
    type: String,
    trim: true
  },
  
  // Trip details
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    enum: ['3-5', '6-8', '9-12', '13+']
  },
  
  travelers: {
    type: String,
    required: [true, 'Number of travelers is required'],
    enum: ['1-2', '3-4', '5-6', '7+']
  },
  
  // Services
  services: [{
    type: String,
    enum: ['tour-guide', 'translator', 'accommodation', 'transport', 'other']
  }],
  
  otherService: String,
  
  // Interests
  interests: [{
    type: String,
    enum: ['gorilla', 'culture', 'hiking', 'wildlife', 'bird-watching', 'relaxation', 'photography']
  }],
  
  // Budget
  budget: {
    type: String,
    required: [true, 'Budget is required'],
    enum: ['budget', 'midrange', 'luxury']
  },
  
  // Additional information
  message: {
    type: String,
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'contacted', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // For assigning to admin/agent
  },
  
  notes: [{
    content: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Analytics
  source: {
    type: String,
    default: 'website'
  },
  
  ipAddress: String,
  userAgent: String
  
}, {
  timestamps: true
});

// Indexes for faster queries
tripPlanSchema.index({ status: 1, createdAt: -1 });
tripPlanSchema.index({ email: 1 });
tripPlanSchema.index({ startDate: 1 });

// Virtual for total days
tripPlanSchema.virtual('durationDays').get(function() {
  const map = {
    '3-5': 4,
    '6-8': 7,
    '9-12': 10,
    '13+': 14
  };
  return map[this.duration] || 7;
});

const TripPlan = mongoose.model('TripPlan', tripPlanSchema);

module.exports = TripPlan;