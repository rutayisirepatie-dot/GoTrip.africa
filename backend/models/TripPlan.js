// backend/models/Trip.js
import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number }, // in days
  startDate: Date,
  endDate: Date,
  guides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guide' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;