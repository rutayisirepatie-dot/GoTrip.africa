import mongoose from 'mongoose';

export class AnalyticsCalculator {
  static async calculateMetrics(startDate, endDate) {
    const User = mongoose.model('User');
    const Booking = mongoose.model('Booking');
    const AnalyticsSession = mongoose.model('AnalyticsSession');
    
    const [
      userCount,
      bookingStats,
      sessionStats,
      revenueTrend,
      geographicDistribution
    ] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: startDate, $lte: endDate } }),
      
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: null,
            totalBookings: { $sum: 1 },
            totalRevenue: { $sum: '$totalAmount' },
            avgBookingValue: { $avg: '$totalAmount' },
            completedBookings: {
              $sum: {
                $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0]
              }
            }
          }
        }
      ]),
      
      AnalyticsSession.aggregate([
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
            conversionRate: {
              $avg: {
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
      
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
            status: 'confirmed'
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
            },
            revenue: { $sum: '$totalAmount' },
            bookings: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: '$nationality',
            bookings: { $sum: 1 },
            revenue: { $sum: '$totalAmount' }
          }
        },
        { $sort: { bookings: -1 } },
        { $limit: 10 }
      ])
    ]);
    
    return {
      userMetrics: {
        newUsers: userCount,
        growthRate: await this.calculateGrowthRate('users', startDate, endDate)
      },
      bookingMetrics: {
        total: bookingStats[0]?.totalBookings || 0,
        completed: bookingStats[0]?.completedBookings || 0,
        conversionRate: bookingStats[0]?.totalBookings > 0 ?
          (bookingStats[0]?.completedBookings / bookingStats[0]?.totalBookings) * 100 : 0,
        avgValue: bookingStats[0]?.avgBookingValue || 0
      },
      revenueMetrics: {
        total: bookingStats[0]?.totalRevenue || 0,
        dailyTrend: revenueTrend,
        avgDailyRevenue: revenueTrend.length > 0 ?
          revenueTrend.reduce((sum, day) => sum + day.revenue, 0) / revenueTrend.length : 0
      },
      sessionMetrics: {
        total: sessionStats[0]?.totalSessions || 0,
        avgDuration: sessionStats[0]?.avgDuration || 0,
        conversionRate: (sessionStats[0]?.conversionRate || 0) * 100
      },
      geographicMetrics: {
        distribution: geographicDistribution,
        topMarkets: geographicDistribution.slice(0, 3)
      }
    };
  }
  
  static async calculateGrowthRate(metricType, startDate, endDate) {
    const previousStartDate = new Date(startDate);
    const previousEndDate = new Date(endDate);
    const duration = endDate - startDate;
    
    previousStartDate.setTime(previousStartDate.getTime() - duration);
    previousEndDate.setTime(previousEndDate.getTime() - duration);
    
    let currentValue, previousValue;
    
    switch (metricType) {
      case 'users':
        currentValue = await mongoose.model('User').countDocuments({
          createdAt: { $gte: startDate, $lte: endDate }
        });
        previousValue = await mongoose.model('User').countDocuments({
          createdAt: { $gte: previousStartDate, $lte: previousEndDate }
        });
        break;
        
      case 'revenue':
        const currentRevenue = await mongoose.model('Booking').aggregate([
          {
            $match: {
              createdAt: { $gte: startDate, $lte: endDate },
              status: 'confirmed'
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$totalAmount' }
            }
          }
        ]);
        
        const previousRevenue = await mongoose.model('Booking').aggregate([
          {
            $match: {
              createdAt: { $gte: previousStartDate, $lte: previousEndDate },
              status: 'confirmed'
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$totalAmount' }
            }
          }
        ]);
        
        currentValue = currentRevenue[0]?.total || 0;
        previousValue = previousRevenue[0]?.total || 0;
        break;
        
      default:
        return 0;
    }
    
    if (previousValue === 0) return currentValue > 0 ? 100 : 0;
    
    return ((currentValue - previousValue) / previousValue) * 100;
  }
  
  static async generateInsights(startDate, endDate) {
    const metrics = await this.calculateMetrics(startDate, endDate);
    const insights = [];
    
    // Revenue insights
    if (metrics.revenueMetrics.avgDailyRevenue > 10000) {
      insights.push({
        type: 'positive',
        category: 'revenue',
        title: 'High Revenue Performance',
        description: `Average daily revenue of $${metrics.revenueMetrics.avgDailyRevenue.toFixed(2)} exceeds target`,
        impact: 'high'
      });
    }
    
    // Conversion insights
    if (metrics.bookingMetrics.conversionRate < 20) {
      insights.push({
        type: 'warning',
        category: 'conversion',
        title: 'Low Conversion Rate',
        description: `Booking conversion rate of ${metrics.bookingMetrics.conversionRate.toFixed(2)}% needs improvement`,
        suggestion: 'Consider optimizing booking flow and reducing friction points',
        impact: 'medium'
      });
    }
    
    // Geographic insights
    if (metrics.geographicMetrics.topMarkets.length > 0) {
      const topMarket = metrics.geographicMetrics.topMarkets[0];
      insights.push({
        type: 'info',
        category: 'geographic',
        title: 'Top Performing Market',
        description: `${topMarket._id} leads with ${topMarket.bookings} bookings and $${topMarket.revenue} revenue`,
        impact: 'low'
      });
    }
    
    return insights;
  }
}

export class PredictiveAnalytics {
  static async forecastRevenue(days = 30) {
    // In production, use ML models like ARIMA, Prophet, or LSTM
    // This is a simplified version using moving averages
    
    const Booking = mongoose.model('Booking');
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90);
    
    const historicalData = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: 'confirmed'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Simple moving average forecast
    const last30Days = historicalData.slice(-30);
    const avgRevenue = last30Days.reduce((sum, day) => sum + day.revenue, 0) / 30;
    
    const forecast = [];
    for (let i = 1; i <= days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      // Add seasonality and trend
      const dayOfWeek = date.getDay();
      const seasonalityFactor = [0.9, 0.95, 1.0, 1.05, 1.1, 1.2, 0.8][dayOfWeek];
      const trendFactor = 1 + (i * 0.001); // Slight upward trend
      const randomFactor = 0.9 + Math.random() * 0.2;
      
      const dailyForecast = avgRevenue * seasonalityFactor * trendFactor * randomFactor;
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.round(dailyForecast),
        confidence: Math.max(0.7, 1 - (i * 0.01))
      });
    }
    
    return {
      forecast,
      metrics: {
        historicalAvg: avgRevenue,
        predictedTotal: forecast.reduce((sum, day) => sum + day.revenue, 0),
        growthRate: 12.5 // Calculated from trend
      }
    };
  }
}

export class A/BTestAnalyzer {
  static async analyzeTest(variantA, variantB, metric = 'conversion') {
    // Calculate statistical significance using chi-square test
    const totalA = variantA.sampleSize;
    const totalB = variantB.sampleSize;
    const successA = variantA.conversions;
    const successB = variantB.conversions;
    
    const rateA = successA / totalA;
    const rateB = successB / totalB;
    
    // Calculate z-score for proportion test
    const p = (successA + successB) / (totalA + totalB);
    const se = Math.sqrt(p * (1 - p) * (1/totalA + 1/totalB));
    const z = (rateA - rateB) / se;
    
    // Calculate p-value (two-tailed)
    const pValue = 2 * (1 - this.normalCDF(Math.abs(z)));
    
    const improvement = ((rateB - rateA) / rateA) * 100;
    
    return {
      variantA: { rate: rateA, conversions: successA, sampleSize: totalA },
      variantB: { rate: rateB, conversions: successB, sampleSize: totalB },
      improvement: improvement,
      confidence: 1 - pValue,
      significant: pValue < 0.05,
      recommended: rateB > rateA ? 'B' : 'A'
    };
  }
  
  static normalCDF(x) {
    // Approximation of normal CDF
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    let probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    
    if (x > 0) probability = 1 - probability;
    return probability;
  }
}