// testAtlasConnection.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testAtlas() {
  try {
    console.log('🔗 Testing MongoDB Atlas connection...');
    
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ MONGO_URI not found in .env');
      return;
    }
    
    // Hide password in logs
    const safeUri = mongoUri.replace(/\/\/(.*):(.*)@/, '//***:***@');
    console.log('Using URI:', safeUri);
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Connected to MongoDB Atlas!');
    console.log('Host:', mongoose.connection.host);
    console.log('Database:', mongoose.connection.name);
    
    // Check current collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`\n📁 Collections in database: ${collections.length}`);
    
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`  ${col.name}: ${count} documents`);
    }
    
    await mongoose.disconnect();
    console.log('\n✅ Atlas connection test successful!');
    
  } catch (error) {
    console.error('❌ Atlas connection failed:', error.message);
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('\n💡 Common issues:');
      console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
      console.log('2. Verify username/password are correct');
      console.log('3. Check if the cluster is running');
      console.log('4. Make sure network allows outbound connections on port 27017');
    }
  }
}

testAtlas();