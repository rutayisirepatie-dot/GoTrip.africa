import mongoose from 'mongoose';
import validator from 'validator';

const guideSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: [String],
      validate: [emails => emails.every(e => validator.isEmail(e)), 'Invalid email']
    },
    phone: String,
    languages: [String],
    specialty: String,
    experienceYears: Number,
    dailyRate: Number,
    rating: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
    image: String,
    certifications: [String],
    description: String,
  },
  {
    collection: 'guides', // explicit binding
    timestamps: true
  }
);

guideSchema.virtual('name').get(function() { 
  return `${this.firstName} ${this.lastName}`; 
});

// Make virtuals appear in JSON output
guideSchema.set('toJSON', { virtuals: true });
guideSchema.set('toObject', { virtuals: true });

const Guide = mongoose.models.Guide || mongoose.model('Guide', guideSchema);
export default Guide;