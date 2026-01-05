import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true, 
      validate: [validator.isEmail, 'Invalid email'] 
    },
    password: { type: String, required: true, select: false },
    phone: String,
    country: String,
    role: { type: String, enum: ['user','admin','guide','translator'], default: 'user' },
    status: { type: String, enum: ['active','inactive','pending'], default: 'active' },
    address: String,
    dob: Date,
    passport: String,
    preferences: String,
    lastLogin: Date,
  },
  {
    collection: 'users', // explicit binding
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Optional: index email for faster lookup
userSchema.index({ email: 1 });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;