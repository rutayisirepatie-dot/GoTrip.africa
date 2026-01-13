// fixSeedIssues.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

async function fixSeedIssues() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // Import your models
    const Destination = (await import('./models/Destination.js')).default;
    const Accommodation = (await import('./models/Accommodation.js')).default;
    const Blog = (await import('./models/Blog.js')).default;
    const Booking = (await import('./models/Booking.js')).default;
    const TripPlan = (await import('./models/TripPlan.js')).default;
    const Contact = (await import('./models/Contact.js')).default;
    const Newsletter = (await import('./models/Newsletter.js')).default;
    const User = (await import('./models/User.js')).default;
    const Guide = (await import('./models/Guide.js')).default;

    console.log('🔍 Checking model schemas...\n');

    // Test each model with sample data
    const testData = {
      accommodations: [
        {
          name: "Test Hotel",
          location: "Test Location",
          type: "Hotel",
          description: "Test description",
          pricePerNight: 100,
          rating: 4.5,
          amenities: ["WiFi", "Pool"],
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          available: true,
          contactPhone: "+250788111222",
          contactEmail: "test@example.com",
          maxGuests: 2
        }
      ],
      blogs: [
        {
          title: "Test Blog Post",
          author: "Test Author",
          content: "Test content",
          excerpt: "Test excerpt",
          featuredImage: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          tags: ["test"],
          category: "Test",
          featured: false,
          readTime: 5,
          published: true
        }
      ]
    };

    // Test Accommodation model
    console.log('🧪 Testing Accommodation model...');
    try {
      const testAccommodation = new Accommodation(testData.accommodations[0]);
      await testAccommodation.validate();
      console.log('✅ Accommodation model validation passed');
    } catch (error) {
      console.log('❌ Accommodation validation error:', error.message);
      console.log('Required fields:', error.errors);
    }

    // Test Blog model
    console.log('\n🧪 Testing Blog model...');
    try {
      const testBlog = new Blog(testData.blogs[0]);
      await testBlog.validate();
      console.log('✅ Blog model validation passed');
    } catch (error) {
      console.log('❌ Blog validation error:', error.message);
      console.log('Required fields:', error.errors);
    }

    // Now let's manually create the missing data
    console.log('\n🎯 Creating missing data...');

    // Get existing users and guides for references
    const users = await User.find();
    const guides = await Guide.find();
    const destinations = await Destination.find();

    if (users.length > 0 && guides.length > 0 && destinations.length > 0) {
      
      // 1. Create Accommodations
      const accommodationsData = [
        {
          name: "Kigali Marriott Hotel",
          location: "Kigali, Rwanda",
          type: "Hotel",
          description: "5-star luxury hotel in the heart of Kigali with panoramic city views and world-class amenities.",
          pricePerNight: 250,
          rating: 4.8,
          amenities: ["Pool", "Spa", "Restaurant", "Gym", "WiFi", "Airport Shuttle", "Conference Room"],
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          available: true,
          contactPhone: "+250788111222",
          contactEmail: "reservations@marriottkigali.com",
          maxGuests: 4
        },
        {
          name: "Volcanoes Gorilla Lodge",
          location: "Musanze, Rwanda",
          type: "Lodge",
          description: "Eco-friendly lodge at the foothills of the Virunga volcanoes, perfect for gorilla trekking with cozy fireplace lounge.",
          pricePerNight: 350,
          rating: 4.7,
          amenities: ["Restaurant", "Fireplace", "Garden", "WiFi", "Hot Water", "Guided Tours", "Bar"],
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          available: true,
          contactPhone: "+250788333444",
          contactEmail: "info@volcanoeslodge.com",
          maxGuests: 3
        }
      ];

      console.log('🏨 Creating accommodations...');
      for (const accData of accommodationsData) {
        try {
          const accommodation = new Accommodation(accData);
          await accommodation.save();
          console.log(`  ✓ ${accommodation.name}`);
        } catch (error) {
          console.log(`  ❌ Failed: ${accData.name} - ${error.message}`);
        }
      }

      // 2. Create Blogs
      const blogsData = [
        {
          title: "Gorilla Trekking in Rwanda: A Complete Guide",
          author: "Jean de Dieu",
          content: "Mountain gorilla trekking in Rwanda's Volcanoes National Park is a once-in-a-lifetime experience...",
          excerpt: "A comprehensive guide to gorilla trekking in Rwanda.",
          featuredImage: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          tags: ["Wildlife", "Adventure", "Rwanda"],
          category: "Wildlife",
          featured: true,
          readTime: 8,
          published: true
        }
      ];

      console.log('\n📝 Creating blogs...');
      for (const blogData of blogsData) {
        try {
          const blog = new Blog(blogData);
          await blog.save();
          console.log(`  ✓ ${blog.title}`);
        } catch (error) {
          console.log(`  ❌ Failed: ${blogData.title} - ${error.message}`);
        }
      }

      // 3. Create Contact
      console.log('\n📧 Creating contact...');
      try {
        const Contact = (await import('./models/Contact.js')).default;
        const contact = new Contact({
          name: "Test User",
          email: "test@example.com",
          phone: "+250788999000",
          subject: "Test Inquiry",
          message: "This is a test message",
          status: "new"
        });
        await contact.save();
        console.log(`  ✓ Contact message created`);
      } catch (error) {
        console.log(`  ❌ Failed to create contact: ${error.message}`);
      }

      // 4. Create Newsletter
      console.log('\n📰 Creating newsletter subscription...');
      try {
        const Newsletter = (await import('./models/Newsletter.js')).default;
        const newsletter = new Newsletter({
          email: "subscriber@example.com",
          isSubscribed: true
        });
        await newsletter.save();
        console.log(`  ✓ Newsletter subscription created`);
      } catch (error) {
        console.log(`  ❌ Failed to create newsletter: ${error.message}`);
      }

    } else {
      console.log('⚠️ Cannot create related data - missing users, guides, or destinations');
    }

    await mongoose.disconnect();
    console.log('\n✅ Fix completed!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixSeedIssues();