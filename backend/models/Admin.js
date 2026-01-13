import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email address"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"]
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"]
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "moderator", "editor"],
      default: "admin"
    },
    permissions: {
      type: [String], // Changed from embedded to array of strings
      default: [],
      enum: ["all", "users", "content", "bookings", "settings", "reports"]
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true,
    collection: 'admins',
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        delete ret.password; // Never send password in JSON
        ret.id = doc._id.toString();
        return ret;
      }
    }
  }
);

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for formatted name
adminSchema.virtual('displayName').get(function () {
  return this.name || this.username;
});

// Indexes
adminSchema.index({ username: 1 }, { unique: true });
adminSchema.index({ email: 1 }, { unique: true });
adminSchema.index({ role: 1 });
adminSchema.index({ isActive: 1 });

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin;