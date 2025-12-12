const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // User information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  userName: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  
  phone: {
    type: String,
    required: true
  },
  
  // Service information
  serviceType: {
    type: String,
    required: true,
    enum: ['guide', 'translator', 'destination', 'accommodation', 'transport', 'package']
  },
  
  serviceId: {
    type: String,
    required: true
  },
  
  serviceName: {
    type: String,
    required: true
  },
  
  servicePrice: {
    type: String,
    required: true
  },
  
  // Booking details
  startDate: {
    type: Date,
    required: true
  },
  
  duration: {
    type: Number, // Days
    required: true,
    min: 1,
    max: 30
  },
  
  endDate: {
    type: Date
  },
  
  location: {
    type: String,
    required: true
  },
  
  groupSize: {
    type: String,
    required: true
  },
  
  // Price calculation
  dailyRate: {
    type: Number,
    required: true
  },
  
  totalPrice: {
    type: Number,
    required: true
  },
  
  // Payment information
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'paid', 'refunded', 'cancelled'],
    default: 'pending'
  },
  
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'cash', null],
    default: null
  },
  
  paymentDate: Date,
  
  transactionId: String,
  
  // Status tracking
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  
  // Special requirements
  message: String,
  
  specialRequirements: String,
  
  // For accommodation bookings
  checkin: Date,
  checkout: Date,
  guests: Number,
  rooms: Number,
  roomType: String,
  
  // For destination bookings
  packageType: String,
  
  // Admin notes
  adminNotes: [{
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
  
  // Reference to assigned guide/translator
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Cancellation
  cancelledAt: Date,
  cancellationReason: String,
  
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

// Indexes
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ status: 1, startDate: 1 });
bookingSchema.index({ serviceType: 1 });
bookingSchema.index({ paymentStatus: 1 });

// Virtual for calculating end date
bookingSchema.pre('save', function(next) {
  if (this.startDate && this.duration) {
    const endDate = new Date(this.startDate);
    endDate.setDate(endDate.getDate() + this.duration);
    this.endDate = endDate;
  }
  
  // Calculate total price if not set
  if (!this.totalPrice && this.dailyRate && this.duration) {
    this.totalPrice = this.dailyRate * this.duration;
  }
  
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;