import mongoose from 'mongoose';
import validator from 'validator';

const translatorSchema = new mongoose.Schema(
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
    collection: 'translators', // explicit binding
    timestamps: true
  }
);

translatorSchema.virtual('name').get(function() { 
  return `${this.firstName} ${this.lastName}`; 
});

translatorSchema.set('toJSON', { virtuals: true });
translatorSchema.set('toObject', { virtuals: true });

const Translator = mongoose.models.Translator || mongoose.model('Translator', translatorSchema);
export default Translator;