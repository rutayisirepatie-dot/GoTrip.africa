import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import bookingRoutes from './routes/booking.js';
import guideRoutes from './routes/guide.js';
import destinationRoutes from './routes/destination.js';
import translatorRoutes from './routes/translator.js';
import accommodationRoutes from './routes/accommodation.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/go-trip')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error', err.message));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/translators', translatorRoutes);
app.use('/api/accommodations', accommodationRoutes);

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Endpoint not found' }));

// Error
app.use((err, req, res, next) => res.status(500).json({ success: false, message: err.message }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));