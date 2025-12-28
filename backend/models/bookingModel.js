import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  serviceName: { type: String, required: true },
  serviceType: { 
    type: String, 
    enum: ['destination', 'guide', 'translator', 'accommodation'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  },
  date: { type: Date, default: Date.now },
  totalAmount: { type: Number, min: 0, required: true }
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default Booking;