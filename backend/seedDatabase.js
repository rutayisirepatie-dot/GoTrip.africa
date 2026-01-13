import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('🚀 Starting GoTrip Database Seeding...');
console.log('📅', new Date().toLocaleString());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gotrip';
console.log('🔗 Connecting to:', mongoUri);

// Simple models definition (temporary)
const destinationSchema = new mongoose.Schema({
  _id: String,
  name: String,
  location: String,
  country: String,
  description: String,
  rating: Number,
  basePrice: Number,
  duration: String,
  activities: Array,
  images: Array
});

const guideSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  phone: String,
  country: String,
  dailyRate: Number,
  description: String,
  rating: Number,
  available: Boolean,
  languages: Array,
  specialty: String
});

const accommodationSchema = new mongoose.Schema({
  _id: String,
  name: String,
  location: String,
  type: String,
  description: String,
  pricePerNight: Number,
  rating: Number,
  amenities: Array,
  available: Boolean
});

const blogPostSchema = new mongoose.Schema({
  _id: String,
  title: String,
  author: String,
  content: String,
  excerpt: String,
  featuredImage: String,
  tags: Array,
  category: String,
  readTime: Number,
  published: Boolean,
  views: Number
});

// Create models
const Destination = mongoose.model('Destination', destinationSchema);
const Guide = mongoose.model('Guide', guideSchema);
const Accommodation = mongoose.model('Accommodation', accommodationSchema);
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Rwanda Seed Data
const rwandaData = {
  destinations: [
    {
      _id: 'rw-volcanoes-park',
      name: 'Volcanoes National Park',
      location: 'Musanze District, Northern Province',
      country: 'Rwanda',
      description: 'Home to the endangered mountain gorillas in Rwanda\'s northern province.',
      rating: 4.9,
      basePrice: 1500,
      duration: '1-3 Days',
      activities: [
        { name: 'Mountain Gorilla Trekking', duration: '4-8 hours' },
        { name: 'Golden Monkey Tracking', duration: '2-4 hours' }
      ],
      images: [
        'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=800&fit=crop&q=80'
      ]
    },
    {
      _id: 'rw-akagera-park',
      name: 'Akagera National Park',
      location: 'Eastern Rwanda',
      country: 'Rwanda',
      description: 'Rwanda\'s only savannah park featuring the Big 5.',
      rating: 4.6,
      basePrice: 900,
      duration: '2-3 Days',
      activities: [
        { name: 'Big 5 Safari', duration: '3-4 hours' },
        { name: 'Boat Safari', duration: '2 hours' }
      ],
      images: [
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop&q=80'
      ]
    }
  ],
  
  guides: [
    {
      _id: 'guide-jean-de-dieu',
      name: 'Jean de Dieu Nzabonimpa',
      email: 'jean@gotrip.com',
      phone: '+250788333333',
      country: 'Rwanda',
      dailyRate: 150,
      description: 'RDB-certified expert guide specializing in gorilla trekking.',
      rating: 4.9,
      available: true,
      languages: ['Kinyarwanda', 'English', 'French'],
      specialty: 'Gorilla Trekking'
    },
    {
      _id: 'guide-marie-claire',
      name: 'Marie Claire Uwimana',
      email: 'marie@gotrip.com',
      phone: '+250788444444',
      country: 'Rwanda',
      dailyRate: 120,
      description: 'Bird watching expert and nature photographer.',
      rating: 4.7,
      available: true,
      languages: ['Kinyarwanda', 'English', 'Swahili'],
      specialty: 'Bird Watching'
    }
  ],
  
  accommodations: [
    {
      _id: 'acc-kigali-marriott',
      name: 'Kigali Marriott Hotel',
      location: 'Kigali, Rwanda',
      type: '5-Star Hotel',
      description: 'Luxury hotel in the heart of Kigali.',
      pricePerNight: 250,
      rating: 4.8,
      amenities: [
        { name: 'Swimming Pool', included: true },
        { name: 'Free WiFi', included: true }
      ],
      available: true
    },
    {
      _id: 'acc-volcanoes-lodge',
      name: 'Volcanoes Gorilla Lodge',
      location: 'Musanze, Rwanda',
      type: 'Eco-Lodge',
      description: 'Eco-friendly lodge at the foothills of the Virunga volcanoes.',
      pricePerNight: 350,
      rating: 4.7,
      amenities: [
        { name: 'Fireplace Lounge', included: true },
        { name: 'Organic Restaurant', included: true }
      ],
      available: true
    }
  ],
  
  blogPosts: [
    {
      _id: 'blog-gorilla-trekking',
      title: 'Ultimate Guide to Gorilla Trekking in Rwanda',
      author: 'Jean de Dieu Nzabonimpa',
      content: 'Complete guide to planning your gorilla trekking adventure...',
      excerpt: 'Learn about permits, preparation, what to expect...',
      featuredImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=800&fit=crop&q=80',
      tags: ['Gorilla Trekking', 'Wildlife', 'Rwanda'],
      category: 'Wildlife & Adventure',
      readTime: 12,
      published: true,
      views: 1250
    }
  ]
};

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing collections
    console.log('🧹 Clearing existing data...');
    await Destination.deleteMany({});
    await Guide.deleteMany({});
    await Accommodation.deleteMany({});
    await BlogPost.deleteMany({});
    console.log('✅ Existing data cleared');
    
    // Seed destinations
    console.log('\n📍 Seeding destinations...');
    for (const dest of rwandaData.destinations) {
      await Destination.create(dest);
      console.log(`   ✓ ${dest.name}`);
    }
    console.log(`✅ ${rwandaData.destinations.length} destinations seeded`);
    
    // Seed guides
    console.log('\n👥 Seeding guides...');
    for (const guide of rwandaData.guides) {
      await Guide.create(guide);
      console.log(`   ✓ ${guide.name} ($${guide.dailyRate}/day)`);
    }
    console.log(`✅ ${rwandaData.guides.length} guides seeded`);
    
    // Seed accommodations
    console.log('\n🏨 Seeding accommodations...');
    for (const acc of rwandaData.accommodations) {
      await Accommodation.create(acc);
      console.log(`   ✓ ${acc.name} ($${acc.pricePerNight}/night)`);
    }
    console.log(`✅ ${rwandaData.accommodations.length} accommodations seeded`);
    
    // Seed blog posts
    console.log('\n📝 Seeding blog posts...');
    for (const post of rwandaData.blogPosts) {
      await BlogPost.create(post);
      console.log(`   ✓ "${post.title}"`);
    }
    console.log(`✅ ${rwandaData.blogPosts.length} blog posts seeded`);
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('🎉 DATABASE SEEDING COMPLETE!');
    console.log('='.repeat(50));
    console.log('📊 SUMMARY:');
    console.log(`   • Destinations: ${await Destination.countDocuments()}`);
    console.log(`   • Guides: ${await Guide.countDocuments()}`);
    console.log(`   • Accommodations: ${await Accommodation.countDocuments()}`);
    console.log(`   • Blog Posts: ${await BlogPost.countDocuments()}`);
    console.log(`   • Total: ${await Destination.countDocuments() + await Guide.countDocuments() + await Accommodation.countDocuments() + await BlogPost.countDocuments()} documents`);
    console.log('\n✅ Ready to use!');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);
  }
};

seedDatabase();