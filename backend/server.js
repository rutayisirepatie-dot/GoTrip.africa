import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// ====================
// Load ENV (Render-compatible)
// ====================
// Multiple fallback paths for different environments
try {
  // Try root directory
  dotenv.config({ path: path.resolve('.env') });
} catch (err) {
  try {
    // Try backend directory
    dotenv.config({ path: path.resolve('backend/.env') });
  } catch (err2) {
    // Render provides environment variables directly
    console.log('✅ Using Render environment variables');
  }
}

// ====================
// App Init
// ====================
const app = express();
const PORT = process.env.PORT || 5000;

// ====================
// Middleware
// ====================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ====================
// CORS (Production Safe with Render support)
// ====================
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:8080',
  'https://gotrip-frontend.onrender.com',
  'https://gotrip-backend-uwhn.onrender.com',
  /\.onrender\.com$/,
];

// Add environment variable origins if set
if (process.env.CORS_ORIGIN) {
  const envOrigins = process.env.CORS_ORIGIN.split(',');
  allowedOrigins.push(...envOrigins);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Handle preflight requests
app.options('*', cors());

// ====================
// Health Check (NO RATE LIMIT)
// ====================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    app: process.env.APP_NAME || 'Go Trip',
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    cors: allowedOrigins
  });
});

// ====================
// Rate Limiting (AFTER HEALTH)
// ====================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// ====================
// MOCK DATA ENDPOINTS (For fallback)
// ====================
app.get('/api/mock/guides', (req, res) => {
  const mockGuides = [
    { 
      _id: "1", 
      name: "Jean Claude N.", 
      specialty: "Gorilla Trekking Expert", 
      languages: ["English", "French", "Swahili"],
      experience: "8 years experience",
      rating: 4.9,
      price: "$150/day",
      image: "./images/jean-claude.jpg",
      description: "Expert guide specializing in gorilla trekking with extensive knowledge of Volcanoes National Park.",
      status: "available",
      createdAt: new Date().toISOString()
    },
    { 
      _id: "2", 
      name: "Marie Aimee K.", 
      specialty: "Cultural Tour Guide", 
      languages: ["English", "Swahili", "Kinyarwanda", "French"],
      experience: "6 years experience",
      rating: 4.8,
      price: "$160/day",
      image: "./images/marie-aimee.jpg",
      description: "Cultural expert providing deep insights into Rwandan traditions and history.",
      status: "available",
      createdAt: new Date().toISOString()
    },
    { 
      _id: "3", 
      name: "David M.", 
      specialty: "Bird Watching Specialist", 
      languages: ["English", "German", "French"],
      experience: "10 years experience",
      rating: 4.9,
      price: "$180/day",
      image: "./images/david-m.jpg",
      description: "Specialized bird watching guide with extensive knowledge of avian species.",
      status: "available",
      createdAt: new Date().toISOString()
    },
    { 
      _id: "4", 
      name: "Sarah T.", 
      specialty: "Adventure Hiking Guide", 
      languages: ["English", "French", "Spanish"],
      experience: "7 years experience",
      rating: 4.7,
      price: "$150/day",
      image: "./images/sarah-t.jpg",
      description: "Experienced hiking guide for mountain trails and adventure tours.",
      status: "available",
      createdAt: new Date().toISOString()
    }
  ];
  res.json({ success: true, data: mockGuides });
});

app.get('/api/mock/destinations', (req, res) => {
  const mockDestinations = [
    {
      _id: "1",
      name: "Volcanoes National Park",
      location: "Northern Province, Rwanda",
      description: "Home to the endangered mountain gorillas, this UNESCO World Heritage site offers unforgettable gorilla trekking experiences in the Virunga Mountains.",
      image: "./images/mount-bisoke-rwanda.jpg",
      features: ["Gorilla Trekking", "Mountain Hiking", "Bird Watching", "Cultural Villages"],
      rating: 4.9,
      price: "From $1,500",
      category: "National Park",
      popularity: 95,
      createdAt: new Date().toISOString()
    },
    {
      _id: "2",
      name: "Lake Kivu",
      location: "Western Province, Rwanda",
      description: "One of Africa's Great Lakes, offering stunning views, water sports, beautiful beaches, and relaxing hot springs along its shores.",
      image: "./images/ruanda-lake-kivu-aussicht.jpg",
      features: ["Beaches", "Boating", "Swimming", "Hot Springs"],
      rating: 4.7,
      price: "From $300",
      category: "Lake",
      popularity: 85,
      createdAt: new Date().toISOString()
    },
    {
      _id: "3",
      name: "Nyungwe Forest National Park",
      location: "Southern Province, Rwanda",
      description: "Ancient rainforest with canopy walkway, home to chimpanzees and over 300 bird species. One of Africa's oldest forests.",
      image: "./images/nyungwe-weather.jpg",
      features: ["Canopy Walk", "Chimpanzee Tracking", "Hiking", "Waterfalls"],
      rating: 4.8,
      price: "From $600",
      category: "National Park",
      popularity: 90,
      createdAt: new Date().toISOString()
    },
    {
      _id: "4",
      name: "Kigali City",
      location: "Kigali, Rwanda",
      description: "The vibrant capital city known for its cleanliness, safety, and rich cultural experiences including museums, markets, and memorial sites.",
      image: "./images/mount-jali-hike.jpg",
      features: ["City Tours", "Cultural Museums", "Markets", "Nightlife"],
      rating: 4.8,
      price: "From $100",
      category: "City",
      popularity: 88,
      createdAt: new Date().toISOString()
    }
  ];
  res.json({ success: true, data: mockDestinations });
});

app.get('/api/mock/translators', (req, res) => {
  const mockTranslators = [
    { 
      _id: "1", 
      name: "Patience Rutayisire", 
      languages: ["English", "German", "Spanish", "French", "Swahili", "Chinese", "Kinyarwanda"],
      specialty: "Tourism & Business Translation",
      rating: 4.9,
      price: "$140/day",
      image: "./images/Patie.png",
      experience: "5 years experience",
      description: "Professional translator specializing in tourism and business communications.",
      status: "available",
      createdAt: new Date().toISOString()
    },
    { 
      _id: "2", 
      name: "Eric M.", 
      languages: ["English", "German", "Chinese", "Kinyarwanda", "French"],
      specialty: "Medical & Technical Translation",
      rating: 4.8,
      price: "$150/day",
      image: "./images/eric-m.jpg",
      experience: "8 years experience",
      description: "Specialized in medical and technical translations",
      status: "available",
      createdAt: new Date().toISOString()
    },
    { 
      _id: "3", 
      name: "Grace U.", 
      languages: ["English", "Spanish", "Portuguese", "Kinyarwanda", "French"],
      specialty: "Legal & Government Translation",
      rating: 4.7,
      price: "$130/day",
      image: "./images/grace-u.jpg",
      experience: "6 years experience",
      description: "Expert in legal documents and government communications translation.",
      status: "available",
      createdAt: new Date().toISOString()
    }
  ];
  res.json({ success: true, data: mockTranslators });
});

app.get('/api/mock/accommodations', (req, res) => {
  const mockAccommodations = [
    { 
      _id: "1", 
      name: "Bisate Lodge", 
      location: "Volcanoes National Park",
      type: "Luxury Eco-Lodge",
      description: "Award-winning eco-lodge with stunning views of the volcanoes, offering luxury accommodation and direct gorilla trekking access.",
      image: "./images/Bisate-Lodge-Rwanda-Exterior.jpg",
      features: ["Private Villas", "Gorilla Views", "Spa", "Fine Dining"],
      price: "$2,500/night",
      rating: 4.9,
      availability: "available",
      createdAt: new Date().toISOString()
    },
    { 
      _id: "2", 
      name: "Lake Kivu Serena Hotel", 
      location: "Gisenyi, Lake Kivu",
      type: "5-Star Hotel",
      description: "Luxury resort on the shores of Lake Kivu with private beach, water sports, and panoramic lake views.",
      image: "./images/aeriel-view-serena.jpg",
      features: ["Lake View", "Private Beach", "Spa", "Water Sports"],
      price: "$450/night",
      rating: 4.7,
      availability: "available",
      createdAt: new Date().toISOString()
    },
    { 
      _id: "3", 
      name: "Kigali Marriott Hotel", 
      location: "Kigali City Center",
      type: "Business Hotel",
      description: "Modern luxury hotel in the heart of Kigali, perfect for business travelers and tourists alike.",
      image: "./images/mariot-kigali.png",
      features: ["City Center", "Business Center", "Pool", "Multiple Restaurants"],
      price: "$350/night",
      rating: 4.6,
      availability: "available",
      createdAt: new Date().toISOString()
    },
    { 
      _id: "4", 
      name: "One&Only Gorilla's Nest", 
      location: "Volcanoes National Park",
      type: "Luxury Resort",
      description: "Ultra-luxurious resort offering bespoke gorilla trekking experiences and unparalleled comfort.",
      image: "./images/one-and-only-kinigi.jpg",
      features: ["Butler Service", "Private Trekking", "Helicopter Transfer", "Fine Dining"],
      price: "$3,500/night",
      rating: 4.9,
      availability: "available",
      createdAt: new Date().toISOString()
    }
  ];
  res.json({ success: true, data: mockAccommodations });
});

app.get('/api/mock/blog', (req, res) => {
  const mockBlogs = [
    { 
      _id: "1", 
      title: "Complete Guide to Gorilla Trekking in Rwanda", 
      excerpt: "Everything you need to know about mountain gorilla trekking in Volcanoes National Park, including permits, preparation, and what to expect.",
      date: "December 25, 2025",
      category: "Adventure",
      image: "./images/gorilla-trekk-rwanda.jpg",
      readTime: "8 min read",
      author: "Jean Claude",
      content: "Volcanoes National Park in Rwanda is home to the endangered mountain gorillas. Trekking to see these magnificent creatures is a once-in-a-lifetime experience that requires proper planning and preparation. The park offers various trekking packages suitable for different fitness levels. Permits must be obtained in advance through authorized tour operators like Go Trip.",
      views: 1250,
      likes: 89,
      createdAt: new Date().toISOString()
    },
    { 
      _id: "2", 
      title: "Best Time to Visit Rwanda: Weather & Seasons Guide", 
      excerpt: "Planning your trip? Here's when to visit Rwanda for the best wildlife viewing, hiking conditions, and cultural experiences.",
      date: "December 28, 2025",
      category: "Travel Tips",
      image: "./images/rwanda-landscape.jpg",
      readTime: "6 min read",
      author: "Travel Team",
      content: "Rwanda's climate varies throughout the year, affecting wildlife viewing and trekking conditions. The dry seasons from June to September and December to February are ideal for gorilla trekking and hiking. The wet seasons offer lush green landscapes and fewer tourists.",
      views: 980,
      likes: 76,
      createdAt: new Date().toISOString()
    },
    { 
      _id: "3", 
      title: "Rwandan Culture: Traditions, Food & Etiquette", 
      excerpt: "Discover the rich cultural heritage of Rwanda, from traditional dances and ceremonies to delicious local cuisine.",
      date: "December 15, 2025",
      category: "Culture",
      image: "./images/intore-dancers.jpg",
      readTime: "7 min read",
      author: "Marie Aimee",
      content: "Rwanda's culture is as diverse as its landscapes. From the vibrant Intore dance performances to the unique culinary traditions, visitors are welcomed with warm hospitality. Understanding local customs and etiquette enhances your travel experience.",
      views: 1120,
      likes: 92,
      createdAt: new Date().toISOString()
    },
    { 
      _id: "4", 
      title: "Top 10 Hiking Trails in the Land of a Thousand Hills", 
      excerpt: "Explore Rwanda's breathtaking landscapes through these incredible hiking trails suitable for all fitness levels.",
      date: "October 30, 2025",
      category: "Hiking",
      image: "./images/rwanda-hiking.jpg",
      readTime: "9 min read",
      author: "Sarah T.",
      content: "Rwanda's nickname 'Land of a Thousand Hills' is well-deserved. From the challenging Mount Karisimbi to the scenic Congo Nile Trail, there are hiking opportunities for everyone. Each trail offers unique views of Rwanda's stunning landscapes.",
      views: 870,
      likes: 67,
      createdAt: new Date().toISOString()
    }
  ];
  res.json({ success: true, data: mockBlogs });
});

// ====================
// Routes (Dynamic import for Render compatibility)
// ====================
let routesLoaded = false;
const loadRoutes = async () => {
  try {
    // Dynamic imports to avoid Render build issues
    const authRoutes = await import('./routes/auth.js');
    const adminRoutes = await import('./routes/admin.js');
    const bookingRoutes = await import('./routes/booking.js');
    const guideRoutes = await import('./routes/guide.js');
    const destinationRoutes = await import('./routes/destination.js');
    const translatorRoutes = await import('./routes/translator.js');
    const accommodationRoutes = await import('./routes/accommodation.js');
    const userRoutes = await import('./routes/user.js');
    const tripPlanRoutes = await import('./routes/tripPlan.js');
    const newsletterRoutes = await import('./routes/newsletter.js');
    const contactRoutes = await import('./routes/contact.js');
    const dashboardRoutes = await import('./routes/dashboard.js');
    const blogRoutes = await import('./routes/blog.js');

    app.use('/api/auth', authRoutes.default);
    app.use('/api/guides', guideRoutes.default);
    app.use('/api/destinations', destinationRoutes.default);
    app.use('/api/translators', translatorRoutes.default);
    app.use('/api/accommodations', accommodationRoutes.default);
    app.use('/api/blog', blogRoutes.default);
    app.use('/api/newsletter', newsletterRoutes.default);
    app.use('/api/contact', contactRoutes.default);
    app.use('/api/bookings', bookingRoutes.default);
    app.use('/api/tripPlan', tripPlanRoutes.default);
    app.use('/api/user', userRoutes.default);
    app.use('/api/dashboard', dashboardRoutes.default);
    app.use('/api/admin', adminRoutes.default);
    
    routesLoaded = true;
    console.log('✅ All routes loaded successfully');
  } catch (error) {
    console.warn('⚠️ Route imports failed, using mock endpoints only:', error.message);
    console.log('ℹ️  Mock data available at: /api/mock/*');
  }
};

// ====================
// 404 Handler
// ====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
    availableEndpoints: [
      '/api/health',
      '/api/mock/guides',
      '/api/mock/destinations',
      '/api/mock/translators',
      '/api/mock/accommodations',
      '/api/mock/blog'
    ]
  });
});

// ====================
// Global Error Handler
// ====================
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.message || err);
  
  // Handle CORS errors specifically
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      message: 'CORS policy violation. Origin not allowed.',
      allowedOrigins: allowedOrigins.filter(o => typeof o === 'string'),
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ====================
// MongoDB + Server Start
// ====================
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://ivanrutayisire_db_user:BKYf0mQaEuQVOh7a@cluster0.ugnrvcg.mongodb.net/gotrip_db?retryWrites=true&w=majority';

async function startServer() {
  console.log('🚀 Starting Go Trip Backend Server...');
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 Port: ${PORT}`);
  
  try {
    // Try to connect to MongoDB (optional for Render)
    if (mongoUri && !mongoUri.includes('localhost')) {
      console.log('🔗 Attempting MongoDB connection...');
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
      });
      console.log('✅ MongoDB connected successfully');
    } else {
      console.log('⚠️  MongoDB URI not configured, running without database');
      console.log('📊 Using mock data endpoints');
    }
    
    // Load routes after MongoDB connection attempt
    await loadRoutes();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🎭 Mock data: http://localhost:${PORT}/api/mock/guides`);
      console.log(`🌐 Allowed origins:`, allowedOrigins.filter(o => typeof o === 'string'));
      console.log(`📊 Routes loaded: ${routesLoaded ? 'Yes' : 'No (using mock endpoints)'}`);
    });
    
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('⚠️  Starting server in fallback mode with mock data only...');
    
    // Load routes anyway
    await loadRoutes();
    
    // Start server without database
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running WITHOUT database on http://0.0.0.0:${PORT}`);
      console.log(`📊 Mock endpoints available`);
      console.log(`🌐 Allowed origins:`, allowedOrigins.filter(o => typeof o === 'string'));
    });
  }
}

// Handle process events
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  console.error('Stack:', err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start the server
startServer();

export default app;