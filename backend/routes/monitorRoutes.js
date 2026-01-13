import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/status', async (req, res) => {
  try {
    const dbStatus = {
      state: mongoose.connection.readyState,
      stateText: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState],
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      collections: await mongoose.connection.db?.listCollections().toArray() || [],
      stats: await mongoose.connection.db?.stats() || {}
    };

    res.json({
      success: true,
      database: dbStatus,
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        connections: mongoose.connections.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get database status',
      error: error.message
    });
  }
});

export default router;