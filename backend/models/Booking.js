import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: [true, 'Booking ID is required'],
    unique: true,
    index: true
  },
  customer: {
    fullName: {
      type: String,
      required: [true, 'Full name is required']
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
    address: String
  },
  bookingType: {
    type: String,
    required: [true, 'Booking type is required'],
    enum: ['destination', 'accommodation', 'guide', 'translator', 'package']
  },
  itemId: {
    type: String,
    required: [true, 'Item ID is required']
  },
  itemName: {
    type: String,
    required: [true, 'Item name is required']
  },
  dates: {
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    duration: Number
  },
  guests: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0
    },
    infants: {
      type: Number,
      default: 0
    },
    total: Number
  },
  services: [{
    name: String,
    price: Number,
    quantity: Number,
    total: Number
  }],
  pricing: {
    subtotal: Number,
    taxes: Number,
    fees: Number,
    discount: Number,
    totalAmount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    depositAmount: Number,
    depositPaid: {
      type: Boolean,
      default: false
    }
  },
  payment: {
    method: String,
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded']
    },
    transactionId: String,
    paymentDate: Date
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'refunded'],
    index: true
  },
  specialRequests: String,
  notes: String,
  createdAt: {
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

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    this.bookingId = `GT${timestamp}${random}`.toUpperCase();
  }
  
  // Calculate total guests
  if (this.guests) {
    this.guests.total = (this.guests.adults || 0) + (this.guests.children || 0) + (this.guests.infants || 0);
  }
  
  next();
});

// Indexes
bookingSchema.index({ bookingId: 1 });
bookingSchema.index({ 'customer.email': 1 });
bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ 'dates.startDate': 1 });
bookingSchema.index({ bookingType: 1, itemId: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;