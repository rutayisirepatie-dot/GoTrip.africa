import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true
    },

    sessionId: {
      type: String,
      required: true,
      index: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },

    eventType: {
      type: String,
      required: true,
      enum: [
        'page_view',
        'button_click',
        'form_submit',
        'search',
        'filter',
        'sort',
        'add_to_cart',
        'remove_from_cart',
        'booking_start',
        'booking_complete',
        'payment_start',
        'payment_complete',
        'login',
        'logout',
        'signup',
        'share',
        'download',
        'scroll',
        'video_play',
        'rating',
        'review'
      ],
      index: true
    },

    eventCategory: String,
    eventAction: String,
    eventLabel: String,
    eventValue: Number,

    metadata: {
      type: mongoose.Schema.Types.Mixed
    },

    page: {
      path: String,
      title: String,
      url: String,
      referrer: String
    },

    deviceInfo: {
      type: {
        type: String,
        enum: ['desktop', 'mobile', 'tablet']
      },
      browser: String,
      os: String,
      screenResolution: String,
      language: String
    },

    location: {
      country: String,
      region: String,
      city: String,
      latitude: Number,
      longitude: Number
    },

    timestamp: {
      type: Date,
      default: Date.now,
      index: true
    },

    processed: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    // ✅ Correct Time Series configuration
    timeseries: {
      timeField: 'timestamp',
      metaField: 'eventType', // low-cardinality ✔
      granularity: 'hours'
    }
  }
);

// ---------------- INDEXES (SAFE SET) ----------------
analyticsEventSchema.index({ eventType: 1, timestamp: -1 });
analyticsEventSchema.index({ userId: 1, timestamp: -1 });
analyticsEventSchema.index({ sessionId: 1, timestamp: -1 });

// ---------------- STATIC METHODS ----------------
analyticsEventSchema.statics.getEventMetrics = async function (
  startDate,
  endDate,
  eventType = null
) {
  const matchStage = {
    timestamp: { $gte: startDate, $lte: endDate }
  };

  if (eventType) {
    matchStage.eventType = eventType;
  }

  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$timestamp'
          }
        },
        count: { $sum: 1 },
        uniqueUsers: { $addToSet: '$userId' },
        totalValue: { $sum: { $ifNull: ['$eventValue', 0] } }
      }
    },
    {
      $project: {
        date: '$_id',
        count: 1,
        uniqueUsersCount: { $size: '$uniqueUsers' },
        totalValue: 1,
        avgValue: {
          $cond: [
            { $eq: ['$count', 0] },
            0,
            { $divide: ['$totalValue', '$count'] }
          ]
        }
      }
    },
    { $sort: { date: 1 } }
  ]);
};

// ---------------- FUNNEL ANALYSIS ----------------
analyticsEventSchema.statics.getFunnelAnalysis = async function (
  funnelSteps,
  startDate,
  endDate
) {
  const funnelData = [];

  for (let i = 0; i < funnelSteps.length; i++) {
    const step = funnelSteps[i];

    const matchStage = {
      timestamp: { $gte: startDate, $lte: endDate },
      eventType: step.eventType
    };

    const result = await this.aggregate([
      { $match: matchStage },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);

    const count = result[0]?.count || 0;

    funnelData.push({
      step: step.name,
      eventType: step.eventType,
      count,
      dropoff:
        i > 0 && funnelData[i - 1].count > 0
          ? Number(
              (
                ((funnelData[i - 1].count - count) /
                  funnelData[i - 1].count) *
                100
              ).toFixed(2)
            )
          : 0
    });
  }

  return funnelData;
};

// ✅ Hot-reload safe export
const AnalyticsEvent =
  mongoose.models.AnalyticsEvent ||
  mongoose.model('AnalyticsEvent', analyticsEventSchema);

export default AnalyticsEvent;