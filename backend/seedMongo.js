// backend/seedMongo.js
const mongoose = require('mongoose');
require('dotenv').config();

const { users, guides, destinations, accommodations, newsletters } = require('./seedData');

const User = require('./models/User');
const Guide = require('./models/Guide');
const Destination = require('./models/Destination');
const Accommodation = require('./models/Accommodation');
const Newsletter = require('./models/Newsletter');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Users
    for (const u of users) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) await User.create(u);
      else console.log(`⚠️ User exists: ${u.email}`);
    }

    // Guides
    for (const g of guides) {
      const exists = await Guide.findOne({ email: g.email });
      if (!exists) await Guide.create(g);
      else console.log(`⚠️ Guide exists: ${g.email}`);
    }

    // Destinations
    for (const d of destinations) {
      const exists = await Destination.findOne({ name: d.name });
      if (!exists) await Destination.create(d);
      else console.log(`⚠️ Destination exists: ${d.name}`);
    }

    // Accommodations
    for (const a of accommodations) {
      const exists = await Accommodation.findOne({ name: a.name });
      if (!exists) await Accommodation.create(a);
      else console.log(`⚠️ Accommodation exists: ${a.name}`);
    }

    // Newsletters
    for (const n of newsletters) {
      const exists = await Newsletter.findOne({ title: n.title });
      if (!exists) await Newsletter.create(n);
      else console.log(`⚠️ Newsletter exists: ${n.title}`);
    }

    console.log('✅ Database seeded successfully');
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    mongoose.connection.close();
    console.log('🛑 Disconnected from MongoDB');
  }
};

const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();