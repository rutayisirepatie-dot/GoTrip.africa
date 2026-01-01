import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: String,
  image: String,
  popular: { type: Boolean, default: false }
}, { timestamps: true });

// Safe model compilation to prevent OverwriteModelError
const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

export default Destination;