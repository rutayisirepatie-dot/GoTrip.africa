import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  type: String,
  price: String,
  rating: { type: Number, min: 0, max: 5 },
  description: String,
  image: String,
  available: { type: Boolean, default: true }
}, { timestamps: true });

const Accommodation = mongoose.model('Accommodation', accommodationSchema);
export default Accommodation;