// adminSetup.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gotrip';

const seedAdminAndLogin = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // 2️⃣ Check if admin exists
    let admin = await User.findOne({ email: 'admin@example.com' });

    if (!admin) {
      // Create new admin with hashed password
      const hashedPassword = await bcrypt.hash('Admin123!', 10);

      admin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      });

      await admin.save();
      console.log('✅ Admin user created successfully');
    } else {
      console.log('ℹ️ Admin user already exists');

      // Ensure existing admin has a hashed password
      if (!admin.password) {
        admin.password = await bcrypt.hash('Admin123!', 10);
        await admin.save();
        console.log('ℹ️ Existing admin password updated');
      }
    }

    // 3️⃣ Generate JWT token directly (no need to compare password here)
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    console.log('✅ Admin setup complete');
    console.log('📌 JWT Token (use this in Postman for Bearer Auth):');
    console.log(token);

    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

seedAdminAndLogin();