import PerformanceMetric from '../models/PerformanceMetric.js';

export const performanceMonitor = (req, res, next) => {
  const startTime = process.hrtime();
  
  // Store original methods
  const originalSend = res.send;
  const originalJson = res.json;
  
  // Override send method
  res.send = function(body) {
    const duration = process.hrtime(startTime);
    const durationMs = duration[0] * 1000 + duration[1] / 1000000;
    
    // Log performance metric
    if (durationMs > 100) { // Only log slow requests
      PerformanceMetric.create({
        metricId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        metricType: 'api_response_time',
        endpoint: req.path,
        method: req.method,
        duration: {
          value: durationMs,
          unit: 'ms'
        },
        statusCode: res.statusCode,
        userId: req.user?._id,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        additionalData: {
          query: req.query,
          params: req.params
        },
        timestamp: new Date()
      }).catch(console.error);
    }
    
    // Call original method
    return originalSend.call(this, body);
  };
  
  // Override json method
  res.json = function(body) {
    const duration = process.hrtime(startTime);
    const durationMs = duration[0] * 1000 + duration[1] / 1000000;
    
    // Log performance metric
    if (durationMs > 100) {
      PerformanceMetric.create({
        metricId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        metricType: 'api_response_time',
        endpoint: req.path,
        method: req.method,
        duration: {
          value: durationMs,
          unit: 'ms'
        },
        statusCode: res.statusCode,
        userId: req.user?._id,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        additionalData: {
          query: req.query,
          params: req.params
        },
        timestamp: new Date()
      }).catch(console.error);
    }
    
    // Call original method
    return originalJson.call(this, body);
  };
  
  next();
};

// Database query monitoring
export const queryMonitor = (schema) => {
  schema.pre(/^find/, function(next) {
    this._startTime = process.hrtime();
    next();
  });
  
  schema.post(/^find/, function(docs, next) {
    if (this._startTime) {
      const duration = process.hrtime(this._startTime);
      const durationMs = duration[0] * 1000 + duration[1] / 1000000;
      
      if (durationMs > 500) { // Log slow queries (>500ms)
        PerformanceMetric.create({
          metricId: `query_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          metricType: 'database_query_time',
          endpoint: this.mongooseCollection.name,
          method: this.op,
          duration: {
            value: durationMs,
            unit: 'ms'
          },
          additionalData: {
            collection: this.mongooseCollection.name,
            operation: this.op,
            query: this._conditions,
            options: this.options
          },
          timestamp: new Date()
        }).catch(console.error);
      }
    }
    next();
  });
};