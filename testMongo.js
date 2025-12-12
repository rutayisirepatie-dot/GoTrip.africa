// testMongo.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./backend/models/User');
const Destination = require('./backend/models/Destination');
const Guide = require('./backend/models/Guide');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adventure-hillbound';

const runTest = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // ---------- User ----------
    let user;
    try {
      const hashedPassword = await bcrypt.hash('Test123!', 12);
      user = await User.create({
        name: 'Test User',
        email: 'testuser@example.com',
        password: hashedPassword,
        role: 'user',
        emailVerified: true
      });
      console.log('✅ User created:', user.email);
    } catch (err) {
      if (err.code === 11000) {
        user = await User.findOne({ email: 'testuser@example.com' });
        console.log('⚠️  User already exists:', user.email);
      } else {
        console.error('❌ User error:', err.message);
        return;
      }
    }

    // ---------- Destination ----------
    try {
      // Get province enum dynamically from schema
      const provinceEnum = Destination.schema.path('province').enumValues;
      const validProvince = provinceEnum.length ? provinceEnum[0] : 'Kigali';

      const destination = await Destination.create({
        name: 'Sample Destination',
        location: 'Sample City',
        description: 'Test destination',
        province: validProvince, 
        priceRange: { min: 50, max: 200 },
        coordinates: { lat: -1.9500, lng: 30.0588 },
        slug: 'sample-destination'
      });
      console.log('✅ Destination created:', destination.name);
    } catch (err) {
      if (err.code === 11000) {
        console.log('⚠️  Destination already exists, skipping...');
      } else {
        console.error('❌ Destination error:', err.message);
      }
    }

    // ---------- Guide ----------
    try {
      // Get specialty enum dynamically
      const specialtyEnum = Guide.schema.path('specialty').enumValues;
      const validSpecialty = specialtyEnum.length ? specialtyEnum[0] : 'Mountain';

      const guide = await Guide.create({
        name: 'Test Guide',
        email: 'guide@example.com',
        phone: '+250788000001',
        languages: [
          { language: 'English' },
          { language: 'Kinyarwanda' }
        ],
        slug: 'test-guide',
        price: { dailyRate: 100 },
        experienceYears: 5,
        specialty: validSpecialty, 
        user: user._id
      });
      console.log('✅ Guide created:', guide.name);
    } catch (err) {
      if (err.code === 11000) {
        console.log('⚠️  Guide already exists, skipping...');
      } else {
        console.error('❌ Guide error:', err.message);
      }
    }

    // ---------- Show all ----------
    const users = await User.find();
    const destinations = await Destination.find();
    const guides = await Guide.find();

    console.log('\n--- Users ---', users.map(u => u.email));
    console.log('--- Destinations ---', destinations.map(d => d.name));
    console.log('--- Guides ---', guides.map(g => g.name));

  } catch (err) {
    console.error('❌ MongoDB error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🛑 Disconnected from MongoDB');
  }
};

runTest();