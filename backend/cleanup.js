// cleanup.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });

async function cleanup() {
  try {
    console.log('🧹 Starting database cleanup...');
    
    // Get the MongoDB URI
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('❌ No MongoDB URI found in .env file');
      console.log('💡 Make sure you have either MONGO_URI or MONGODB_URI in your .env file');
      return;
    }
    
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');
    
    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    console.log('🗑️  Clearing collections:');
    console.log('='.repeat(40));
    
    for (const collection of collections) {
      try {
        const result = await mongoose.connection.db.collection(collection.name).deleteMany({});
        console.log(`✓ ${collection.name}: Deleted ${result.deletedCount} documents`);
      } catch (error) {
        console.log(`⚠️ ${collection.name}: ${error.message}`);
      }
    }
    
    // Also drop the database to ensure clean state
    // await mongoose.connection.db.dropDatabase();
    // console.log('\n✅ Database dropped completely');
    
    await mongoose.disconnect();
    console.log('\n🎉 CLEANUP COMPLETE!');
    console.log('='.repeat(40));
    console.log('✅ All data has been deleted');
    console.log('✅ Ready for fresh seeding');
    console.log('\n👉 Now run: node seedData.js');
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    
    if (error.message.includes('Authentication failed')) {
      console.log('\n💡 Authentication issues:');
      console.log('1. Check your MongoDB Atlas username/password');
      console.log('2. Make sure your IP is whitelisted');
      console.log('3. Verify the database name in your connection string');
    }
  }
}

// Run the cleanup
cleanup();