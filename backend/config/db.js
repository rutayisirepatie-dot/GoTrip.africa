import mongoose from 'mongoose';

const MAX_RETRIES = 5;
let connectionAttempts = 0;
let isConnecting = false;

const connectDB = async () => {
  // Prevent multiple connection attempts
  if (mongoose.connection.readyState >= 1) {
    console.log('📊 MongoDB already connected or connecting');
    return mongoose.connection;
  }

  // Prevent concurrent connection attempts
  if (isConnecting) {
    console.log('⏳ MongoDB connection already in progress...');
    return new Promise((resolve) => {
      const checkConnection = () => {
        if (mongoose.connection.readyState >= 1) {
          resolve(mongoose.connection);
        } else {
          setTimeout(checkConnection, 100);
        }
      };
      checkConnection();
    });
  }

  isConnecting = true;

  try {
    console.log('🔌 Attempting MongoDB connection...');
    
    // Check if MONGO_URI is set
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // Parse MongoDB URI to remove sensitive data from logs
    const parsedUri = new URL(process.env.MONGO_URI);
    const safeUri = `${parsedUri.protocol}//${parsedUri.hostname}${parsedUri.pathname}`;
    console.log(`📡 Connecting to: ${safeUri}`);

    // Connection options for better performance and stability
    const options = {
      maxPoolSize: 10, // Reduced from default 5 to handle more connections
      minPoolSize: 1, // Keep at least 1 connection alive
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout for server selection
      socketTimeoutMS: 45000, // 45 seconds timeout for socket operations
      connectTimeoutMS: 10000, // 10 seconds timeout for initial connection
      retryWrites: true,
      retryReads: true,
      maxIdleTimeMS: 10000, // Close idle connections after 10 seconds
      family: 4, // Use IPv4, skip IPv6
      keepAlive: true, // Enable keep-alive
      keepAliveInitialDelay: 300000, // 5 minutes
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    
    connectionAttempts = 0;
    isConnecting = false;

    console.log(`✅ MongoDB Connected Successfully`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📈 Connection state: ${getConnectionState(mongoose.connection.readyState)}`);
    console.log(`🤝 Pool size: ${mongoose.connection.maxPoolSize}`);

    return conn;
  } catch (error) {
    isConnecting = false;
    connectionAttempts++;

    console.error(`❌ MongoDB Connection Failed (Attempt ${connectionAttempts}/${MAX_RETRIES}):`, error.message);

    // Retry logic with exponential backoff
    if (connectionAttempts < MAX_RETRIES) {
      const delay = Math.min(1000 * Math.pow(2, connectionAttempts), 10000); // Max 10 seconds
      console.log(`⏳ Retrying in ${delay/1000} seconds...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return connectDB(); // Recursive retry
    } else {
      console.error(`💥 Maximum retry attempts (${MAX_RETRIES}) reached`);
      console.error('💡 Please check:');
      console.error('   1. MongoDB Atlas cluster is running');
      console.error('   2. IP address is whitelisted in Atlas');
      console.error('   3. Database user has correct permissions');
      console.error('   4. MONGO_URI in .env file is correct');
      console.error('   5. Internet connection is stable');
      
      // Don't exit process in production, let the app handle it gracefully
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Failed to connect to MongoDB after maximum retries');
      } else {
        process.exit(1);
      }
    }
  }
};

// Helper function to get connection state as string
const getConnectionState = (state) => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized'
  };
  return states[state] || 'unknown';
};

// Set up connection event listeners (only once)
if (!mongoose.connection.listeners('connected').length) {
  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connection established');
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected');
    // Attempt reconnection if not already trying
    if (!isConnecting && mongoose.connection.readyState === 0) {
      setTimeout(() => {
        console.log('🔄 Attempting to reconnect to MongoDB...');
        connectDB().catch(err => console.error('Reconnection failed:', err.message));
      }, 5000);
    }
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err.message);
  });
}

// Graceful shutdown
const shutdown = async () => {
  console.log('🛑 Shutting down MongoDB connection...');
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed gracefully');
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
  }
};

// Handle different shutdown signals
['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal => {
  process.on(signal, async () => {
    console.log(`\n${signal} received`);
    await shutdown();
    process.exit(0);
  });
});

// Optional: Heartbeat to keep connection alive
setInterval(() => {
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.db?.admin().ping()
      .then(() => console.debug('💓 MongoDB heartbeat OK'))
      .catch(err => console.warn('💔 MongoDB heartbeat failed:', err.message));
  }
}, 300000); // Every 5 minutes

// Export both connectDB and shutdown functions
export { connectDB, shutdown };
export default connectDB;