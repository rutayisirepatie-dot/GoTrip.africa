import mongoose from 'mongoose';
import crypto from 'crypto';

const bookingSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: [true, 'User is required'] 
    },
    accommodation: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Accommodation', 
      required: [true, 'Accommodation is required'] 
    },
    startDate: { 
      type: Date, 
      required: [true, 'Start date is required'] 
    },
    endDate: { 
      type: Date, 
      required: [true, 'End date is required'], 
      validate: {
        validator: function(v) {
          return v > this.startDate;
        },
        message: 'End date must be after start date'
      }
    },
    totalPrice: { 
      type: Number, 
      required: [true, 'Total price is required'], 
      min: [0, 'Total price must be positive']
    },
    status: { 
      type: String, 
      enum: ['pending','confirmed','cancelled'], 
      default: 'pending' 
    },
    paymentStatus: { 
      type: String, 
      enum: ['unpaid','paid','refunded'], 
      default: 'unpaid' 
    },
    bookingReference: {
      type: String,
      unique: true,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'bookings', // 🔑 bind to the exact Atlas collection
  }
);

// Pre-validate hook
bookingSchema.pre('validate', async function(next) {
  try {
    // Generate unique booking reference
    if (!this.bookingReference) {
      this.bookingReference = 'BK-' + crypto.randomBytes(5).toString('hex').toUpperCase();
    }

    // Calculate totalPrice if missing
    if (!this.totalPrice) {
      const Accommodation = mongoose.model('Accommodation');
      const accommodation = await Accommodation.findById(this.accommodation);
      if (!accommodation) throw new Error('Accommodation not found');

      const nights = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
      this.totalPrice = accommodation.dailyRate * nights;
    }

    next();
  } catch (err) {
    next(err);
  }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default Booking;