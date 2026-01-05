import mongoose from 'mongoose';
import slugify from 'slugify';

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: String,
    description: String,
    image: String,
    features: [String],
    rating: { type: Number, default: 0 },
    basePrice: Number,
    duration: String,
    bestSeason: [String],
    activities: [String],
    slug: { type: String, unique: true }
  },
  { 
    collection: 'destinations', // explicit binding
    timestamps: true // createdAt + updatedAt
  }
);

// Pre-save hook for slug
destinationSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('name')) {
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await mongoose.models.Destination.exists({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  }
  next();
});

const Destination = mongoose.models.Destination || mongoose.model('Destination', destinationSchema);
export default Destination;