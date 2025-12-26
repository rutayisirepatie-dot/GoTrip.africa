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
import Translator from './models/Translator.js';

// GET all translators
app.get('/api/translators', async (req, res) => {
  try {
    const translators = await Translator.find();
    res.json({ success: true, data: translators });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// CREATE a translator
app.post('/api/translators', async (req, res) => {
  try {
    const translator = new Translator(req.body);
    await translator.save();
    res.status(201).json({ success: true, data: translator });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});