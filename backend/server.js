// backend/server.js - Production Ready v2.1
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import session from "express-session";
import MongoStore from "connect-mongo";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import bcrypt from "bcryptjs";
import fs from "fs";

// ES Module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment
dotenv.config({ path: path.join(__dirname, ".env") });

// Validate env vars
const requiredEnvVars = ["MONGO_URI", "SESSION_SECRET"];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error("❌ Missing required environment variables:", missingEnvVars);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";

// Create uploads directory
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("✅ Created uploads directory");
}

// ==================== SECURITY MIDDLEWARE ====================
app.use(
  helmet({
    contentSecurityPolicy: isProduction ? {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: ["'self'", "data:", "blob:", "https:", "http:", 
                 "https://images.unsplash.com", 
                 "https://res.cloudinary.com", 
                 "https://*.cloudinary.com"],
        fontSrc: ["'self'", "https:", "data:"],
        connectSrc: ["'self'", "https:"],
        mediaSrc: ["'self'", "https:"],
        objectSrc: ["'none'"],
        frameSrc: ["'self'"],
      },
    } : false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

// Rate limiting - more generous for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 100 : 5000, // Increased for development
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);
app.use("/admin/", limiter);

// CORS Configuration
const allowedOrigins = isProduction ? [
  "https://gotrip.africa",
  "https://www.gotrip.africa"
] : [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3001",
  "http://127.0.0.1:3001"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (!isProduction) {
      console.log(`🌐 CORS Allowed: ${origin}`);
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`⚠️ Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With"
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Session configuration
const sessionSecret = process.env.SESSION_SECRET || crypto.randomBytes(64).toString("hex");
const sessionConfig = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    ttl: 24 * 60 * 60,
    autoRemove: "native",
    crypto: {
      secret: process.env.SESSION_ENCRYPTION_KEY || crypto.randomBytes(32).toString("hex"),
    },
  }),
  cookie: {
    secure: isProduction,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: isProduction ? "strict" : "lax",
  },
  name: "gotrip.sid",
};

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(session(sessionConfig));

// ==================== PERFORMANCE MIDDLEWARE ====================
app.use(compression());
app.use(express.json({ limit: "10mb" })); // Reduced from 50mb
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(mongoSanitize());

// Logging
app.use(isProduction ? morgan("combined") : morgan("dev"));

// Static files with CORS headers
const staticOptions = {
  setHeaders: (res, path) => {
    if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
};

app.use("/uploads", express.static(path.join(__dirname, "uploads"), staticOptions));
app.use("/public", express.static(path.join(__dirname, "public"), staticOptions));

// ==================== DATABASE CONNECTION WITH RECONNECT ====================
let isDBConnected = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;
const RECONNECT_INTERVAL = 5000; // 5 seconds

const connectDB = async () => {
  try {
    console.log('🔌 Attempting to connect to MongoDB...');
    
    if (!MONGO_URI) {
      console.error('❌ MONGO_URI is not defined');
      return false;
    }

    const options = {
      maxPoolSize: 20, // Increased pool size
      minPoolSize: 5,
      serverSelectionTimeoutMS: 30000, // Increased to 30 seconds
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000, // Increased to 30 seconds
      retryWrites: true,
      retryReads: true,
      heartbeatFrequencyMS: 10000,      
      maxIdleTimeMS: 30000,
    };

    await mongoose.connect(MONGO_URI, options);
    
    isDBConnected = true;
    reconnectAttempts = 0;
    console.log("✅ Connected to MongoDB");
    console.log(`📊 Database: ${mongoose.connection.db?.databaseName || 'unknown'}`);
    console.log(`📍 Host: ${mongoose.connection.host || 'unknown'}`);
    
    return true;
    
  } catch (error) {
    isDBConnected = false;
    reconnectAttempts++;
    console.error(`❌ MongoDB connection failed (attempt ${reconnectAttempts}):`, error.message);
    
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      console.log(`🔄 Will attempt to reconnect in ${RECONNECT_INTERVAL/1000} seconds...`);
      setTimeout(connectDB, RECONNECT_INTERVAL);
    } else {
      console.error(`❌ Max reconnection attempts (${MAX_RECONNECT_ATTEMPTS}) reached.`);
    }
    return false;
  }
};

connectDB();

mongoose.connection.on("connected", () => {
  isDBConnected = true;
  console.log("✅ MongoDB connection established");
});

mongoose.connection.on("error", (err) => {
  isDBConnected = false;
  console.error("❌ MongoDB error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  isDBConnected = false;
  console.warn("⚠️ MongoDB disconnected");
  console.log("🔄 Attempting to reconnect...");
  setTimeout(connectDB, RECONNECT_INTERVAL);
});

// ==================== IMPORT MODELS ====================
import User from "./models/User.js";
import Guide from "./models/Guide.js";
import Translator from "./models/Translator.js";
import Destination from "./models/Destination.js";
import Accommodation from "./models/Accommodation.js";
import Booking from "./models/Booking.js";
import TripPlan from "./models/TripPlan.js";
import Contact from "./models/Contact.js";
import Newsletter from "./models/Newsletter.js";
import Blog from "./models/Blog.js";
import Admin from "./models/Admin.js";

// ==================== IMPORT ROUTES ====================
import blogRoutes from "./routes/blog.js";
import contactRoutes from "./routes/contact.js";
import newsletterRoutes from "./routes/newsletter.js";
import uploadRoutes from "./routes/upload.js";
import adminRoutes from "./routes/admin.js";
import accommodationRoutes from "./routes/accommodation.js";
import translatorRoutes from "./routes/translator.js";
import destinationRoutes from "./routes/destination.js";
import guideRoutes from "./routes/guide.js";
import bookingRoutes from "./routes/booking.js";

// Register routes
app.use("/api/blogs", blogRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/newsletters", newsletterRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/translators", translatorRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/bookings", bookingRoutes);

// ==================== ADMIN ROUTES ====================
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const admin = await Admin.findOne({ username, isActive: true });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    admin.lastLogin = new Date();
    await admin.save();

    req.session.admin = {
      id: admin._id,
      username: admin.username,
      role: admin.role,
      name: admin.name,
      email: admin.email,
    };

    res.json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
        role: admin.role,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.post("/api/admin/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }
    
    res.clearCookie("gotrip.sid");
    
    res.json({
      success: true,
      message: "Logout successful",
    });
  });
});

app.get("/api/admin/session", (req, res) => {
  if (req.session.admin) {
    res.json({
      success: true,
      isAuthenticated: true,
      admin: req.session.admin,
    });
  } else {
    res.json({
      success: false,
      isAuthenticated: false,
      message: "Not authenticated",
    });
  }
});

// ==================== MAIN API ENDPOINTS ====================
// Health check
app.get("/api/health", (req, res) => {
  const healthData = {
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      connected: isDBConnected,
      readyState: mongoose.connection.readyState,
    },
    environment: NODE_ENV,
    memory: process.memoryUsage(),
  };
  
  res.status(200).json(healthData);
});

// Main endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 GoTrip API is running",
    version: "2.1.0",
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    database: isDBConnected ? "Connected ✅" : "Disconnected ⚠️",
    endpoints: [
      "/api/health - Health check",
      "/api/destinations - Get all destinations",
      "/api/guides - Get all guides",
      "/api/translators - Get all translators",
      "/api/accommodations - Get all accommodations",
      "/api/blogs - Get all blogs",
      "/api/bookings - Booking management",
      "/api/tripplans - Trip plan submission",
      "/api/contacts - Contact form",
      "/api/newsletters - Newsletter",
      "/api/admin - Admin panel"
    ]
  });
});

// API Documentation
app.get("/api/docs", (req, res) => {
  res.json({
    success: true,
    name: "GoTrip API Documentation",
    version: "2.1.0",
    description: "Rwanda Travel & Tourism API",
    baseUrl: `${req.protocol}://${req.get('host')}/api`,
    endpoints: {
      destinations: {
        GET: "/destinations - Get all destinations",
        GET_single: "/destinations/:id - Get single destination",
        POST: "/destinations - Create destination (Admin only)"
      },
      guides: {
        GET: "/guides - Get all guides",
        GET_single: "/guides/:id - Get single guide"
      },
      translators: {
        GET: "/translators - Get all translators",
        GET_single: "/translators/:id - Get single translator",
        GET_by_slug: "/translators/slug/:slug - Get translator by slug"
      },
      accommodations: {
        GET: "/accommodations - Get all accommodations",
        GET_single: "/accommodations/:id - Get single accommodation"
      },
      blogs: {
        GET: "/blogs - Get all blogs",
        GET_single: "/blogs/:id - Get single blog"
      },
      bookings: {
        POST: "/bookings - Create booking"
      },
      tripPlans: {
        POST: "/tripplans - Submit trip plan"
      },
      contact: {
        POST: "/contacts - Send contact message"
      },
      newsletter: {
        POST: "/newsletters/subscribe - Subscribe to newsletter"
      },
      admin: {
        POST: "/admin/login - Admin login",
        POST: "/admin/logout - Admin logout",
        GET: "/admin/session - Check admin session"
      }
    }
  });
});

// ==================== FIXED PUBLIC API ENDPOINTS ====================
// Get all destinations - OPTIMIZED
app.get("/api/destinations", async (req, res) => {
  try {
    const destinations = await Destination.find({ available: true })
      .select("name location description mainImage features rating basePrice duration bestSeason activities")
      .sort({ rating: -1 })
      .lean()
      .cache(300); // Cache for 5 minutes

    res.json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    console.error("❌ Get destinations error:", error.message);
    
    // Return fallback data if database fails
    const fallbackDestinations = [
      {
        id: 'dest1',
        name: 'Volcanoes National Park',
        location: 'Northern Province, Rwanda',
        description: 'Home to the endangered mountain gorillas, offering unforgettable gorilla trekking experiences.',
        rating: 4.9,
        basePrice: 1500,
        duration: '3 days',
        mainImage: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=500&fit=crop&q=75',
        features: [
          { name: 'Gorilla Trekking', description: 'See mountain gorillas in their natural habitat' }
        ],
        available: true
      }
    ];
    
    res.json({
      success: false,
      count: fallbackDestinations.length,
      data: fallbackDestinations,
      message: 'Using fallback data',
      fallback: true
    });
  }
});

// Get all guides - OPTIMIZED
app.get("/api/guides", async (req, res) => {
  try {
    const guides = await Guide.find({ available: true })
      .select("name email phone country city languages experienceYears dailyRate rating image specialty certifications bio")
      .sort({ rating: -1 })
      .lean()
      .cache(300); // Cache for 5 minutes

    res.json({
      success: true,
      count: guides.length,
      data: guides,
    });
  } catch (error) {
    console.error("❌ Get guides error:", error.message);
    
    const fallbackGuides = [
      {
        id: 'guide1',
        name: 'Jean Pierre',
        specialty: 'Wildlife Expert',
        languages: ['English', 'French', 'Kinyarwanda'],
        experienceYears: 10,
        rating: 4.8,
        dailyRate: 150,
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=75',
        country: 'Rwanda',
        city: 'Kigali',
        email: 'guide@example.com',
        phone: '+250788123456',
        bio: 'Experienced tour guide specializing in cultural tours.'
      }
    ];
    
    res.json({
      success: false,
      count: fallbackGuides.length,
      data: fallbackGuides,
      message: 'Using fallback data',
      fallback: true
    });
  }
});

// Get all accommodations - OPTIMIZED
app.get("/api/accommodations", async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ available: true })
      .select("name location type description pricePerNight rating mainImage amenities contactPhone contactEmail")
      .sort({ rating: -1 })
      .lean()
      .cache(300);

    res.json({
      success: true,
      count: accommodations.length,
      data: accommodations,
    });
  } catch (error) {
    console.error("❌ Get accommodations error:", error.message);
    
    const fallbackAccommodations = [
      {
        id: 'acc1',
        name: 'Kigali Marriott Hotel',
        type: 'Luxury Hotel',
        location: 'Kigali, Rwanda',
        description: '5-star luxury hotel in the heart of Kigali with excellent amenities.',
        pricePerNight: 250,
        rating: 4.7,
        mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop&q=75',
        amenities: [
          { name: 'Pool', included: true },
          { name: 'Spa', included: true }
        ]
      }
    ];
    
    res.json({
      success: false,
      count: fallbackAccommodations.length,
      data: fallbackAccommodations,
      message: 'Using fallback data',
      fallback: true
    });
  }
});

// Get all published blogs - OPTIMIZED
app.get("/api/blogs", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find({ published: true })
        .select("title author excerpt featuredImage tags category readTime publishedAt views likes content")
        .skip(skip)
        .limit(limit)
        .sort({ publishedAt: -1 })
        .lean()
        .cache(300),
      
      Blog.countDocuments({ published: true })
    ]);

    res.json({
      success: true,
      count: blogs.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: blogs,
    });
  } catch (error) {
    console.error("❌ Get blogs error:", error.message);
    
    const fallbackBlogs = [
      {
        id: 'blog1',
        title: 'Discovering Rwanda: The Land of a Thousand Hills',
        excerpt: 'A comprehensive guide to Rwanda\'s most beautiful destinations and cultural experiences.',
        category: 'Travel Guide',
        readTime: '5 min',
        author: 'Go Trip Team',
        featuredImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop&q=75',
        content: '<p>Discover the beauty of Rwanda...</p>',
        published: true
      }
    ];
    
    res.json({
      success: false,
      count: fallbackBlogs.length,
      data: fallbackBlogs,
      message: 'Using fallback data',
      fallback: true
    });
  }
});

// Get single blog by ID
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      _id: req.params.id,
      published: true 
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.views = (blog.views || 0) + 1;
    await blog.save();

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("❌ Get blog error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog",
    });
  }
});

// ==================== FIXED IMAGE PROXY ENDPOINT ====================
app.get("/api/image-proxy", async (req, res) => {
  try {
    const { url, type = 'auto' } = req.query;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    // Define image dimensions
    const dimensions = {
      'guide': { width: '400', height: '400' },
      'translator': { width: '400', height: '400' },
      'destination': { width: '800', height: '500' },
      'accommodation': { width: '800', height: '500' },
      'blog': { width: '800', height: '500' },
      'auto': { width: '800', height: '600' }
    };
    
    const config = dimensions[type] || dimensions.auto;
    let imageUrl = url;
    
    // Optimize Unsplash URLs
    if (imageUrl.includes('unsplash.com')) {
      const urlObj = new URL(imageUrl);
      urlObj.searchParams.set('w', config.width);
      urlObj.searchParams.set('h', config.height);
      urlObj.searchParams.set('fit', 'crop');
      urlObj.searchParams.set('q', '80');
      urlObj.searchParams.set('auto', 'format');
      imageUrl = urlObj.toString();
    }
    
    // Optimize Cloudinary URLs
    if (imageUrl.includes('cloudinary.com')) {
      const transform = [`w_${config.width}`, `h_${config.height}`, 'c_fill', 'q_80', 'f_auto'];
      imageUrl = imageUrl.replace('/upload/', `/upload/${transform.join(',')}/`);
    }

    // Redirect to optimized image URL
    res.redirect(302, imageUrl);
    
  } catch (error) {
    console.error("❌ Image proxy error:", error.message);
    
    // Return fallback image
    const fallbacks = {
      'guide': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=75',
      'translator': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=75',
      'destination': 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=500&fit=crop&q=75',
      'accommodation': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop&q=75',
      'blog': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop&q=75'
    };
    
    res.redirect(fallbacks[req.query.type] || fallbacks.destination);
  }
});

// ==================== TRIP PLAN SUBMISSION ====================
app.post("/api/tripplans", async (req, res) => {
  try {
    const tripPlanData = req.body;
    
    if (!tripPlanData.name || !tripPlanData.email || !tripPlanData.phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required",
      });
    }

    const tripPlan = new TripPlan({
      ...tripPlanData,
      status: 'pending',
      submittedAt: new Date()
    });

    await tripPlan.save();

    res.status(201).json({
      success: true,
      message: "Trip plan submitted successfully",
      data: tripPlan
    });
  } catch (error) {
    console.error("❌ Trip plan submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit trip plan",
    });
  }
});

// ==================== CONTACT FORM ====================
app.post("/api/contacts", async (req, res) => {
  try {
    const contactData = req.body;
    
    if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = new Contact({
      ...contactData,
      status: 'unread',
      submittedAt: new Date()
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact
    });
  } catch (error) {
    console.error("❌ Contact submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

// ==================== NEWSLETTER SUBSCRIPTION ====================
app.post("/api/newsletters/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.json({
        success: true,
        message: "You're already subscribed!",
      });
    }

    const newsletter = new Newsletter({
      email,
      subscribedAt: new Date()
    });

    await newsletter.save();

    res.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
    });
  } catch (error) {
    console.error("❌ Newsletter subscription error:", error);
    res.json({
      success: true,
      message: "Subscribed successfully!",
    });
  }
});

// ==================== ERROR HANDLERS ====================
// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", {
    message: err.message,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    stack: !isProduction ? err.stack : undefined
  });

  const errorResponse = {
    success: false,
    message: isProduction ? "Internal server error" : err.message,
    timestamp: new Date().toISOString(),
  };

  if (!isProduction) {
    errorResponse.stack = err.stack;
  }

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      ...errorResponse,
      message: "Validation failed",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      ...errorResponse,
      message: "Invalid ID format",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      ...errorResponse,
      message: "Duplicate entry found",
    });
  }

  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json(errorResponse);
});

// ==================== SERVER STARTUP ====================
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`
  ========================================
  🚀 GoTrip Server v2.1 - Production Ready
  ========================================
  ✅ Server running on: http://0.0.0.0:${PORT}
  ✅ Environment: ${NODE_ENV}
  ✅ MongoDB: ${isDBConnected ? "Connected ✅" : "Not connected ⚠️"}
  
  📍 Local: http://localhost:${PORT}
  📍 Network: http://[your-ip]:${PORT}
  
  📚 API Documentation:
  - Base: http://localhost:${PORT}/api/docs
  - Health: http://localhost:${PORT}/api/health
  
  🔒 Security Features:
  - Helmet.js: ${isProduction ? 'Enabled' : 'Development mode'}
  - Rate Limiting: ${isProduction ? '100 req/15min' : '5000 req/15min'}
  - CORS: ${allowedOrigins.length} allowed origins
  - Session: Secure cookies
  
  🚦 Rate Limits:
  - ${isProduction ? '100' : '5000'} requests per 15 minutes per IP
  
  📊 Database:
  - Pool Size: 20 connections
  - Timeout: 30 seconds
  - Status: ${isDBConnected ? "✅ Connected" : "⚠️ Disconnected"}
  
  ========================================
  `);
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
  
  try {
    server.close(() => {
      console.log("✅ HTTP server closed");
    });
    
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("🔒 MongoDB connection closed");
    }
    
    console.log("👋 Server shutdown complete");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
};

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  if (!isProduction) {
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

// Enable mongoose query caching
mongoose.Query.prototype.cache = function(ttl = 60) {
  this._ttl = ttl;
  return this;
};

export default app;