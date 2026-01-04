import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// ====================
// Load ENV
// ====================
dotenv.config({ path: path.resolve('backend/.env') });

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
// CORS (PRODUCTION SAFE)
// ====================
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: corsOrigins,
  credentials: true,
}));

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
  });
});

// ====================
// Rate Limiting (AFTER HEALTH)
// ====================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api/', limiter);

// ====================
// Routes
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

app.use('/api/auth', authRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/translators', translatorRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tripPlan', tripPlanRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

// ====================
// 404
// ====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// ====================
// Error Handler
// ====================
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server error',
  });
});

// ====================
// MongoDB + Server Start
// ====================
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB failed:', err.message);
    process.exit(1);
  });