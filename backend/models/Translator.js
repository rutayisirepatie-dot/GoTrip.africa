import mongoose from 'mongoose';

const translatorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  languages: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Virtual full name
translatorSchema.virtual('name').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Safe model compilation to prevent OverwriteModelError
const Translator = mongoose.models.Translator || mongoose.model('Translator', translatorSchema);

export default Translator;