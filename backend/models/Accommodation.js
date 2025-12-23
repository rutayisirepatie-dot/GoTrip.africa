// backend/models/Accommodation.js
import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: String, required: true },
  address: String,
  priceRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  type: { type: String, enum: ['hotel', 'hostel', 'apartment'], default: 'hotel' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Accommodation = mongoose.model('Accommodation', accommodationSchema);
export default Accommodation;