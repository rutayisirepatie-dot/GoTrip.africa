// backend/models/Translator.js
import mongoose from 'mongoose';

const translatorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  languages: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

translatorSchema.virtual('name').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const Translator = mongoose.model('Translator', translatorSchema);
export default Translator;