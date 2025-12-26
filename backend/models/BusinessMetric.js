import mongoose from 'mongoose';

const businessMetricSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'],
    default: 'daily',
    index: true
  },
  
  // User Metrics
  totalUsers: Number,
  newUsers: Number,
  activeUsers: Number,
  returningUsers: Number,
  userGrowthRate: Number,
  churnRate: Number,
  
  // Revenue Metrics
  totalRevenue: Number,
  avgRevenuePerUser: Number,
  lifetimeValue: Number,
  monthlyRecurringRevenue: Number,
  bookingsRevenue: Number,
  servicesRevenue: Number,
  
  // Booking Metrics
  totalBookings: Number,
  completedBookings: Number,
  cancelledBookings: Number,
  pendingBookings: Number,
  bookingValue: Number,
  avgBookingValue: Number,
  conversionRate: Number,
  
  // Service Metrics
  guideBookings: Number,
  translatorBookings: Number,
  destinationBookings: Number,
  accommodationBookings: Number,
  packageBookings: Number,
  
  // Geographic Metrics
  bookingsByCountry: [{
    country: String,
    count: Number,
    revenue: Number
  }],
  
  // Customer Metrics
  customerSatisfaction: {
    type: Number,
    min: 0,
    max: 5
  },
  netPromoterScore: Number,
  customerRetentionRate: Number,
  
  // Financial Metrics
  costPerAcquisition: Number,
  returnOnInvestment: Number,
  profitMargin: Number,
  
  // Engagement Metrics
  avgSessionDuration: Number,
  pagesPerSession: Number,
  bounceRate: Number,
  
  // Operational Metrics
  systemUptime: Number,
  avgResponseTime: Number,
  errorRate: Number,
  
  // Forecasted Metrics
  forecastedRevenue: Number,
  forecastedBookings: Number,
  forecastedUsers: Number,
  
  // Custom Dimensions
  dimensions: mongoose.Schema.Types.Mixed,
  
  calculatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timeseries: {
    timeField: 'date',
    metaField: 'period',
    granularity: 'hours'
  }
});

// Indexes for performance
businessMetricSchema.index({ date: -1, period: 1 });
businessMetricSchema.index({ period: 1, date: -1 });

// Static methods for business intelligence
businessMetricSchema.statics.calculateDailyMetrics = async function(date = new Date()) {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));
  
  // Import models
  const User = mongoose.model('User');
  const Booking = mongoose.model('Booking');
  const AnalyticsSession = mongoose.model('AnalyticsSession');
  
  // Calculate metrics
  const [
    userMetrics,
    bookingMetrics,
    revenueMetrics,
    sessionMetrics,
    geoMetrics
  ] = await Promise.all([
    // User metrics
    User.aggregate([
      {
        $match: {
          createdAt: { $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          newUsers: {
            $sum: {
              $cond: [
                { $gte: ['$createdAt', startOfDay] },
                1,
                0
              ]
            }
          }
        }
      }
    ]),
    
    // Booking metrics
    Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      }
    ]),
    
    // Revenue metrics
    Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay },
          status: 'confirmed'
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          avgBookingValue: { $avg: '$totalAmount' },
          count: { $sum: 1 }
        }
      }
    ]),
    
    // Session metrics
    AnalyticsSession.aggregate([
      {
        $match: {
          startTime: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: null,
          avgDuration: { $avg: '$duration' },
          totalSessions: { $sum: 1 },
          conversionCount: {
            $sum: {
              $cond: [
                { $ne: ['$conversion', 'none'] },
                1,
                0
              ]
            }
          }
        }
      }
    ]),
    
    // Geographic metrics
    Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: '$nationality',
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ])
  ]);
  
  // Calculate conversion rate
  const totalSessions = sessionMetrics[0]?.totalSessions || 0;
  const conversionCount = sessionMetrics[0]?.conversionCount || 0;
  const conversionRate = totalSessions > 0 ? (conversionCount / totalSessions) * 100 : 0;
  
  // Prepare metrics object
  const metrics = {
    date: startOfDay,
    period: 'daily',
    
    // User metrics
    totalUsers: userMetrics[0]?.totalUsers || 0,
    newUsers: userMetrics[0]?.newUsers || 0,
    
    // Booking metrics
    totalBookings: bookingMetrics.reduce((sum, b) => sum + b.count, 0),
    completedBookings: bookingMetrics.find(b => b._id === 'confirmed')?.count || 0,
    cancelledBookings: bookingMetrics.find(b => b._id === 'cancelled')?.count || 0,
    pendingBookings: bookingMetrics.find(b => b._id === 'pending')?.count || 0,
    
    // Revenue metrics
    totalRevenue: revenueMetrics[0]?.totalRevenue || 0,
    avgBookingValue: revenueMetrics[0]?.avgBookingValue || 0,
    bookingsRevenue: revenueMetrics[0]?.totalRevenue || 0,
    
    // Engagement metrics
    avgSessionDuration: sessionMetrics[0]?.avgDuration || 0,
    conversionRate: parseFloat(conversionRate.toFixed(2)),
    
    // Geographic metrics
    bookingsByCountry: geoMetrics.map(g => ({
      country: g._id || 'Unknown',
      count: g.count,
      revenue: g.revenue
    })),
    
    calculatedAt: new Date()
  };
  
  // Save metrics
  await this.findOneAndUpdate(
    { date: startOfDay, period: 'daily' },
    metrics,
    { upsert: true, new: true }
  );
  
  return metrics;
};

// Method to get KPI trends
businessMetricSchema.statics.getKPITrends = async function(kpis, startDate, endDate, period = 'daily') {
  return this.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate },
        period: period
      }
    },
    {
      $project: {
        date: 1,
        ...kpis.reduce((acc, kpi) => {
          acc[kpi] = 1;
          return acc;
        }, {})
      }
    },
    { $sort: { date: 1 } }
  ]);
};

export default mongoose.model('BusinessMetric', businessMetricSchema);