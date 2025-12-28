import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Import routes
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
import dataRoutes from './routes/data.js';

dotenv.config();
const app = express();

// ====================
// Middleware
// ====================
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later'
  }
});
app.use('/api/', limiter);

const corsOrigins = process.env.CORS_ORIGIN?.split(',') || [
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'http://localhost:5500'
];
app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: process.env.MAX_FILE_SIZE || '10mb' }));
app.use(express.urlencoded({ extended: true, limit: process.env.MAX_FILE_SIZE || '10mb' }));

// ====================
// MongoDB Connection
// ====================
const mongoOptions = {
  maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE) || 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
};

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gotrip', mongoOptions)
  .then(() => console.log(`✅ MongoDB connected to ${process.env.DB_NAME || 'gotrip_db'}`))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ====================
// Routes
// ====================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: `${process.env.APP_NAME || 'Go Trip'} API v${process.env.APP_VERSION || '1.0.0'} is running`,
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/translators', translatorRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/blog', dataRoutes); // Using data.js for blog routes
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);

// Protected routes (require authentication)
app.use('/api/bookings', bookingRoutes);
app.use('/api/tripPlan', tripPlanRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

// ====================
// Error Handling
// ====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.url} not found`
  });
});

app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ====================
// Start Server
// ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ${process.env.APP_NAME || 'Go Trip'} Server v${process.env.APP_VERSION || '1.0.0'}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});