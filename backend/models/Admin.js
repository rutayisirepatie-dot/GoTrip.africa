import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: String,
  role: {
    type: String,
    default: 'admin',
    enum: ['super-admin', 'admin', 'content-manager']
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  permissions: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;