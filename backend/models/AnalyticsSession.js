import mongoose from 'mongoose';

const analyticsSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  ipAddress: String,
  userAgent: String,
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'bot'],
    default: 'desktop'
  },
  browser: String,
  os: String,
  country: String,
  city: String,
  referrer: String,
  landingPage: String,
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  utmTerm: String,
  utmContent: String,
  startTime: {
    type: Date,
    default: Date.now,
    index: true
  },
  endTime: Date,
  duration: Number, // in seconds
  pageViews: [{
    path: String,
    timestamp: Date,
    duration: Number,
    scrollDepth: {
      type: Number,
      min: 0,
      max: 100
    }
  }],
  events: [{
    eventType: String,
    eventData: mongoose.Schema.Types.Mixed,
    timestamp: Date
  }],
  conversion: {
    type: String,
    enum: ['booking', 'trip_plan', 'newsletter', 'contact', 'none'],
    default: 'none'
  },
  conversionValue: Number,
  isReturning: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '90d' // Auto-delete after 90 days
  }
}, {
  timeseries: {
    timeField: 'startTime',
    metaField: 'sessionId',
    granularity: 'hours'
  }
});

// Indexes for performance
analyticsSessionSchema.index({ startTime: -1 });
analyticsSessionSchema.index({ userId: 1, startTime: -1 });
analyticsSessionSchema.index({ conversion: 1, startTime: -1 });
analyticsSessionSchema.index({ country: 1, startTime: -1 });

// Pre-save middleware
analyticsSessionSchema.pre('save', function(next) {
  if (this.endTime && this.startTime) {
    this.duration = Math.round((this.endTime - this.startTime) / 1000);
  }
  next();
});

// Static methods for analytics
analyticsSessionSchema.statics.getSessionMetrics = async function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        startTime: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: null,
        totalSessions: { $sum: 1 },
        avgDuration: { $avg: '$duration' },
        returningUsers: { $sum: { $cond: ['$isReturning', 1, 0] } },
        newUsers: { $sum: { $cond: ['$isReturning', 0, 1] } },
        totalConversions: {
          $sum: {
            $cond: [
              { $ne: ['$conversion', 'none'] },
              1,
              0
            ]
          }
        },
        conversionValue: { $sum: '$conversionValue' }
      }
    }
  ]);
};

export default mongoose.model('AnalyticsSession', analyticsSessionSchema);