import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// MongoDB connection
const mongoURI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/adventure-hillbound';

// Connection options
const options = {
  maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE || 10),
  serverSelectionTimeoutMS: parseInt(
    process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || 5000
  ),
  socketTimeoutMS: parseInt(process.env.MONGODB_SOCKET_TIMEOUT_MS || 45000),
};

// Enable TLS only for Atlas connections
if (mongoURI.startsWith('mongodb+srv://')) {
  options.tls = true;
  options.tlsAllowInvalidCertificates = false; // keep false for production
}

// Connect to MongoDB
mongoose
  .connect(mongoURI, options)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // exit app if DB connection fails
  });

// Import routes
import authRoutes from './routes/authRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import tripRoutes from './routes/tripPlanRoutes.js';
import guidesRoutes from './routes/guideRoutes.js';
import translatorsRoutes from './routes/translatorRoutes.js';
import accommodationsRoutes from './routes/accommodationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/guides', guidesRoutes);
app.use('/api/translators', translatorsRoutes);
app.use('/api/accommodations', accommodationsRoutes);
app.use('/admin', adminRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/user', userRoutes);
app.use('/api/destination', destinationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
