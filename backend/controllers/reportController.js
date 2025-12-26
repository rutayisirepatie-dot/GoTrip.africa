// backend/controllers/reportController.js
export const generateRevenueReport = async (req, res) => {
  try {
    // Mock data for demonstration
    const report = {
      period: req.query.period || 'monthly',
      data: [
        { month: 'January', revenue: 15000, bookings: 45 },
        { month: 'February', revenue: 18000, bookings: 52 },
        { month: 'March', revenue: 22000, bookings: 68 },
        { month: 'April', revenue: 19000, bookings: 59 },
        { month: 'May', revenue: 25000, bookings: 75 }
      ],
      summary: {
        totalRevenue: 99000,
        avgRevenue: 19800,
        growth: 22.5,
        bestMonth: 'May',
        worstMonth: 'January'
      }
    };
    
    res.json({
      success: true,
      report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate revenue report'
    });
  }
};

export const generateUserReport = async (req, res) => {
  try {
    const report = {
      period: req.query.period || 'monthly',
      summary: {
        totalUsers: 150,
        newUsers: 25,
        activeUsers: 120,
        inactiveUsers: 30,
        userGrowth: 16.7
      },
      demographics: {
        countries: [
          { country: 'Rwanda', users: 45, percentage: 30 },
          { country: 'USA', users: 35, percentage: 23.3 },
          { country: 'UK', users: 25, percentage: 16.7 },
          { country: 'Germany', users: 20, percentage: 13.3 },
          { country: 'Other', users: 25, percentage: 16.7 }
        ],
        roles: [
          { role: 'user', count: 130, percentage: 86.7 },
          { role: 'admin', count: 5, percentage: 3.3 },
          { role: 'guide', count: 10, percentage: 6.7 },
          { role: 'translator', count: 5, percentage: 3.3 }
        ]
      },
      activity: {
        avgSessions: 3.2,
        avgDuration: '8m 45s',
        retentionRate: 72.5,
        churnRate: 12.3
      }
    };
    
    res.json({
      success: true,
      report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate user report'
    });
  }
};

export const generateBookingReport = async (req, res) => {
  try {
    const report = {
      period: req.query.period || 'monthly',
      summary: {
        totalBookings: 298,
        confirmed: 265,
        pending: 23,
        cancelled: 10,
        conversionRate: 88.9,
        avgBookingValue: 450
      },
      byServiceType: [
        { type: 'destination', count: 120, revenue: 180000 },
        { type: 'guide', count: 85, revenue: 12750 },
        { type: 'accommodation', count: 65, revenue: 65000 },
        { type: 'translator', count: 18, revenue: 2250 },
        { type: 'package', count: 10, revenue: 25000 }
      ],
      trends: [
        { month: 'Jan', bookings: 45, revenue: 15000 },
        { month: 'Feb', bookings: 52, revenue: 18000 },
        { month: 'Mar', bookings: 68, revenue: 22000 },
        { month: 'Apr', bookings: 59, revenue: 19000 },
        { month: 'May', bookings: 75, revenue: 25000 }
      ],
      popularServices: [
        { name: 'Gorilla Trekking', bookings: 85 },
        { name: 'City Tour', bookings: 45 },
        { name: 'Bird Watching', bookings: 32 },
        { name: 'Cultural Tour', bookings: 28 },
        { name: 'Mountain Hiking', bookings: 25 }
      ]
    };
    
    res.json({
      success: true,
      report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate booking report'
    });
  }
};

export const generateCustomReport = async (req, res) => {
  try {
    const { metrics, startDate, endDate, format } = req.body;
    
    // For now, return a mock custom report
    const report = {
      type: 'custom',
      parameters: {
        metrics,
        startDate,
        endDate,
        format
      },
      data: {
        revenueMetrics: {
          total: 285000,
          avgMonthly: 57000,
          growth: 22.5
        },
        userMetrics: {
          total: 850,
          newThisPeriod: 150,
          active: 720
        },
        bookingMetrics: {
          total: 298,
          conversionRate: 88.9,
          avgValue: 450
        }
      },
      generatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate custom report'
    });
  }
};

export const generateReportFile = async (req, res) => {
  try {
    const { type } = req.params;
    
    // In a real app, this would generate a PDF/Excel file
    // For now, return JSON with download instructions
    res.json({
      success: true,
      message: `Report generated successfully`,
      downloadUrl: `/api/reports/download/${type}_${Date.now()}.json`,
      format: 'json',
      size: '2.5KB',
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate report file'
    });
  }
};