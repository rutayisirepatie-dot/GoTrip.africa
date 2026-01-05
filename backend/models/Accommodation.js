import mongoose from 'mongoose';
import slugify from 'slugify';

const accommodationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  address: { type: String },
  type: { 
    type: String, 
    enum: ['hotel', 'hostel', 'apartment', 'Luxury Eco-Lodge', 'Business Hotel', 'Luxury Resort'], 
    default: 'hotel' 
  },
  dailyRate: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  features: { type: [String], default: [] },
  available: { type: Boolean, default: true },
  image: { type: String },
}, { 
  timestamps: true,
  collection: 'accommodations' // 🔑 explicit collection binding
});

// Pre-save hook to generate unique slug
accommodationSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('name')) {
    const baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await mongoose.models.Accommodation.exists({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  }
  next();
});

const Accommodation = mongoose.models.Accommodation || mongoose.model('Accommodation', accommodationSchema);
export default Accommodation;