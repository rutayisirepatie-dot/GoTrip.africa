import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  description: String,
  image: String,
  features: [String],
  rating: { type: Number, min: 0, max: 5 },
  price: String,
  basePrice: Number,
  duration: String,
  bestSeason: [String]
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;