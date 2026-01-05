import mongoose from 'mongoose';

const performanceMetricSchema = new mongoose.Schema({
  metricId: {
    type: String,
    required: true,
    unique: true
  },
  metricType: {
    type: String,
    required: true,
    enum: [
      'api_response_time',
      'page_load_time',
      'database_query_time',
      'third_party_api_time',
      'cache_hit_rate',
      'error_rate',
      'uptime',
      'concurrent_users',
      'throughput'
    ],
    index: true
  },
  endpoint: String,
  method: String,
  duration: {
    value: Number,
    unit: {
      type: String,
      enum: ['ms', 's', 'percent'],
      default: 'ms'
    }
  },
  statusCode: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ipAddress: String,
  userAgent: String,
  additionalData: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now, index: true },
  tags: [String]
}, {
  timeseries: {
    timeField: 'timestamp',
    metaField: 'metricId',
    granularity: 'minutes'
  }
});

// -------------------- INDEXES --------------------
performanceMetricSchema.index({ metricType: 1, timestamp: -1 });
performanceMetricSchema.index({ endpoint: 1, timestamp: -1 });

// -------------------- STATIC METHODS --------------------
// Aggregate performance metrics over time
performanceMetricSchema.statics.getPerformanceMetrics = async function(startDate, endDate, metricType = null) {
  const matchStage = { timestamp: { $gte: startDate, $lte: endDate } };
  if (metricType) matchStage.metricType = metricType;

  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d %H:00', date: '$timestamp' } },
        avgDuration: { $avg: '$duration.value' },
        minDuration: { $min: '$duration.value' },
        maxDuration: { $max: '$duration.value' },
        count: { $sum: 1 },
        errorCount: { $sum: { $cond: [{ $gte: ['$statusCode', 400] }, 1, 0] } }
      }
    },
    {
      $project: {
        timestamp: '$_id',
        avgDuration: { $round: ['$avgDuration', 2] },
        minDuration: 1,
        maxDuration: 1,
        count: 1,
        errorRate: {
          $cond: [
            { $eq: ['$count', 0] },
            0,
            { $round: [{ $multiply: [{ $divide: ['$errorCount', '$count'] }, 100] }, 2] }
          ]
        }
      }
    },
    { $sort: { timestamp: 1 } }
  ]);
};

// Get slowest endpoints exceeding a threshold
performanceMetricSchema.statics.getSlowEndpoints = async function(startDate, endDate, threshold = 1000) {
  return this.aggregate([
    {
      $match: {
        timestamp: { $gte: startDate, $lte: endDate },
        metricType: 'api_response_time',
        'duration.value': { $gt: threshold }
      }
    },
    {
      $group: {
        _id: '$endpoint',
        count: { $sum: 1 },
        avgDuration: { $avg: '$duration.value' },
        maxDuration: { $max: '$duration.value' },
        uniqueUsers: { $addToSet: '$userId' }
      }
    },
    {
      $project: {
        endpoint: '$_id',
        count: 1,
        avgDuration: { $round: ['$avgDuration', 2] },
        maxDuration: 1,
        affectedUsers: { $size: '$uniqueUsers' }
      }
    },
    { $sort: { avgDuration: -1 } },
    { $limit: 10 }
  ]);
};

// ✅ Hot-reload safe export
const PerformanceMetric = mongoose.models.PerformanceMetric || mongoose.model('PerformanceMetric', performanceMetricSchema);
export default PerformanceMetric;