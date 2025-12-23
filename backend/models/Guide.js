// backend/models/Guide.js
import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  languages: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

guideSchema.virtual('name').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const Guide = mongoose.model('Guide', guideSchema);
export default Guide;