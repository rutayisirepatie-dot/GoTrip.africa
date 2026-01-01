// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// ====================
// Load .env
// ====================
dotenv.config({ path: path.resolve('backend/.env') });

// ====================
// Import Routes
// ====================
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import bookingRoutes from './routes/booking.js';
import guideRoutes from './routes/guide.js';
import destinationRoutes from './routes/destination.js';
import translatorRoutes from './routes/translator.js';
import accommodationRoutes from './routes/accommodation.js';
import userRoutes from './routes/user.js';
import tripPlanRoutes from './routes/tripPlan.js';
import newsletterRoutes from './routes/newsletter.js';
import contactRoutes from './routes/contact.js';
import dashboardRoutes from './routes/dashboard.js';
import blogRoutes from './routes/blog.js';

// ====================
// Initialize App
// ====================
const app = express();

// ====================
// Middleware
// ====================
app.use(express.json({ limit: process.env.MAX_FILE_SIZE || '10mb' }));
app.use(express.urlencoded({ extended: true, limit: process.env.MAX_FILE_SIZE || '10mb' }));

// CORS
const corsOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'];
app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiter
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000),
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: { success: false, message: 'Too many requests from this IP, try again later' }
});
app.use('/api/', limiter);

// ====================
// MongoDB Connection
// ====================
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/gotrip';
mongoose.connect(mongoUri, {
  maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE) || 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: parseInt(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS) || 10000,
  socketTimeoutMS: parseInt(process.env.MONGODB_SOCKET_TIMEOUT_MS) || 45000,
  family: 4
})
.then(() => console.log(`✅ MongoDB connected to ${process.env.DB_NAME || 'gotrip_db'}`))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ====================
// Health Check
// ====================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: `${process.env.APP_NAME || 'Go Trip'} API is running`,
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ====================
// Routes
// ====================
// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/translators', translatorRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);

// Protected routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/tripPlan', tripPlanRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

// ====================
// 404 Handler
// ====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.url} not found`
  });
});

// ====================
// Global Error Handler
// ====================
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);

  const response = {
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  };

  res.status(err.statusCode || 500).json(response);
});

// ====================
// Start Server
// ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ${process.env.APP_NAME || 'Go Trip'} Server running on http://localhost:${PORT}`);
});