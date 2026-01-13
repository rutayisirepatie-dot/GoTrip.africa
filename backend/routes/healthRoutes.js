import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Store initial connection state
let dbConnected = false;

// Listen for connection events
mongoose.connection.on('connected', () => {
  dbConnected = true;
  console.log('✅ Health check: Database connected');
});

mongoose.connection.on('disconnected', () => {
  dbConnected = false;
  console.log('⚠️ Health check: Database disconnected');
});

router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const isDbConnected = dbState === 1; // 1 = connected

  const healthStatus = {
    status: isDbConnected ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    database: {
      state: dbState,
      status: isDbConnected ? 'connected' : 'disconnected',
      host: isDbConnected ? mongoose.connection.host : 'unknown'
    },
    environment: process.env.NODE_ENV || 'development',
    version: process.version,
    platform: process.platform
  };

  // Return appropriate status code
  if (isDbConnected) {
    res.status(200).json(healthStatus);
  } else {
    healthStatus.message = 'Database connection lost';
    res.status(503).json(healthStatus);
  }
});

export default router;