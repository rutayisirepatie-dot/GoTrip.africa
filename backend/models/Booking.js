import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User is required"]
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: [true, "Destination is required"]
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guide',
      required: [true, "Guide is required"]
    },
    checkIn: {
      type: Date,
      required: [true, "Check-in date is required"]
    },
    checkOut: {
      type: Date,
      required: [true, "Check-out date is required"]
    },
    numberOfPeople: {
      type: Number,
      required: [true, "Number of people is required"],
      min: [1, "At least 1 person is required"],
      max: [20, "Maximum 20 people allowed"]
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Amount cannot be negative"]
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending"
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending"
    },
    specialRequests: {
      type: String,
      maxlength: [500, "Special requests cannot exceed 500 characters"]
    },
    bookingDate: {
      type: Date,
      default: Date.now
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer", "mobile_money"],
      default: "credit_card"
    },
    transactionId: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    collection: 'bookings',
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

// Virtual for duration in days
bookingSchema.virtual('durationDays').get(function () {
  if (!this.checkIn || !this.checkOut) return 0;
  const diffTime = Math.abs(this.checkOut - this.checkIn);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for formatted amount
bookingSchema.virtual('formattedAmount').get(function () {
  return `$${this.totalAmount?.toFixed(2) || '0.00'}`;
});

// Indexes
bookingSchema.index({ user: 1 });
bookingSchema.index({ destination: 1 });
bookingSchema.index({ guide: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ bookingDate: -1 });
bookingSchema.index({ checkIn: 1 });
bookingSchema.index({ checkOut: 1 });

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;