import mongoose from 'mongoose';

const translatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  languages: [String],
  specialty: String,
  rating: { type: Number, min: 0, max: 5 },
  price: String,
  available: { type: Boolean, default: true },
  image: String
}, { timestamps: true });

const Translator = mongoose.model('Translator', translatorSchema);
export default Translator;