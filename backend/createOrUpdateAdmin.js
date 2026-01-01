import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; // adjust the path if needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gotrip_db';

const adminData = {
  name: process.env.ADMIN_FIRST_NAME + ' ' + process.env.ADMIN_LAST_NAME || 'Admin User',
  email: process.env.SUPER_ADMIN_EMAIL || 'admin@gotrip.africa',
  password: 'Admin123!', // default password
  phone: '+250788123456', // must provide a valid phone
  country: 'Rwanda',
  role: 'admin',
  status: 'active'
};

async function createOrUpdateAdmin() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'gotrip_db' });
    console.log('✅ MongoDB connected');

    let admin = await User.findOne({ email: adminData.email });

    if (admin) {
      // Update missing fields
      let updated = false;
      for (let key in adminData) {
        if (!admin[key]) {
          admin[key] = adminData[key];
          updated = true;
        }
      }
      if (updated) {
        await admin.save();
        console.log('✅ Admin user updated successfully');
      } else {
        console.log('✅ Admin user already exists with all required fields');
      }
    } else {
      admin = new User(adminData);
      await admin.save();
      console.log('✅ Admin user created successfully');
    }

    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${adminData.password}`);
    process.exit(0);

  } catch (err) {
    console.error('❌ Error creating/updating admin:', err);
    process.exit(1);
  }
}

createOrUpdateAdmin();