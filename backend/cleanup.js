import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Use your MongoDB URI from .env
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gotrip_db';

const cleanUpCollections = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log('Found collections:');
    collections.forEach(c => console.log('-', c.name));

    // Filter collections with invalid names (spaces or starting/ending with dot)
    const invalidCollections = collections.filter(c => /\s/.test(c.name) || /^\./.test(c.name) || /\.$/.test(c.name));

    if (invalidCollections.length === 0) {
      console.log('No invalid collections found ✅');
    } else {
      console.log('Invalid collections found:');
      invalidCollections.forEach(c => console.log('-', c.name));

      for (const coll of invalidCollections) {
        console.log(`Dropping collection: ${coll.name}`);
        await db.dropCollection(coll.name);
      }
      console.log('✅ Invalid collections removed');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('❌ Cleanup error:', err);
    process.exit(1);
  }
};

cleanUpCollections();