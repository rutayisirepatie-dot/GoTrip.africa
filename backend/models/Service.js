import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true
    },

    description: {
      type: String,
      trim: true
    },

    category: {
      type: String,
      enum: [
        'guide',
        'translator',
        'accommodation',
        'transport',
        'activity',
        'insurance',
        'other'
      ],
      default: 'other',
      index: true
    },

    price: {
      type: Number,
      min: 0
    },

    pricingType: {
      type: String,
      enum: ['fixed', 'per_day', 'per_person'],
      default: 'fixed'
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true
    },

    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Indexes for admin & search
serviceSchema.index({ name: 1 });
serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1, isActive: 1 });

// ✅ Hot-reload safe export
const Service =
  mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;