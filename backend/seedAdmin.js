import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gotrip';

const seedAdminAndGenerateToken = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    let admin = await User.findOne({ email: 'admin@example.com' });

    if (admin) {
      console.log('ℹ️ Admin user already exists');
      admin.password = await bcrypt.hash('Admin123!', 10);
      await admin.save();
      console.log('ℹ️ Admin password updated');
    } else {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      admin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin created');
    }

    // Make sure JWT_SECRET exists
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined in .env');

    // Generate token with key "id"
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    console.log('📌 Admin JWT Token (use this in Postman):');
    console.log(token);

    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

seedAdminAndGenerateToken();