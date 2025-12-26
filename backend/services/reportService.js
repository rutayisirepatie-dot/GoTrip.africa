import BusinessMetric from '../models/BusinessMetric.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import nodemailer from 'nodemailer';
import { createCanvas } from 'canvas';
import PDFDocument from 'pdfkit';
import fs from 'fs';

export class ReportService {
  static async generateDailyReport(date = new Date()) {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    
    // Calculate metrics
    const metrics = await BusinessMetric.calculateDailyMetrics(date);
    
    // Generate report data
    const report = {
      date: startOfDay.toISOString().split('T')[0],
      period: 'daily',
      generatedAt: new Date(),
      metrics,
      insights: await this.generateInsights(metrics),
      recommendations: await this.generateRecommendations(metrics)
    };
    
    // Store report
    await this.storeReport(report);
    
    // Send email notifications to admins
    await this.sendEmailReport(report);
    
    return report;
  }
  
  static async generateWeeklyReport() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    
    const report = {
      period: 'weekly',
      dateRange: { start: startDate, end: endDate },
      generatedAt: new Date(),
      summary: await this.calculateWeeklySummary(startDate, endDate),
      trends: await this.analyzeTrends(startDate, endDate),
      topPerformers: await this.getTopPerformers(startDate, endDate),
      areasForImprovement: await this.identifyImprovementAreas(startDate, endDate)
    };
    
    // Generate PDF report
    const pdfPath = await this.generatePDFReport(report, 'weekly');
    
    // Send to stakeholders
    await this.sendWeeklyReport(report, pdfPath);
    
    return report;
  }
  
  static async generateMonthlyReport() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    
    const report = {
      period: 'monthly',
      dateRange: { start: startDate, end: endDate },
      generatedAt: new Date(),
      executiveSummary: await this.generateExecutiveSummary(startDate, endDate),
      financialAnalysis: await this.analyzeFinancials(startDate, endDate),
      operationalMetrics: await this.getOperationalMetrics(startDate, endDate),
      customerAnalysis: await this.analyzeCustomers(startDate, endDate),
      competitiveAnalysis: await this.analyzeCompetition(startDate, endDate),
      forecast: await this.generateForecast(endDate),
      strategicRecommendations: await this.generateStrategicRecommendations(startDate, endDate)
    };
    
    // Generate comprehensive PDF
    const pdfPath = await this.generateComprehensivePDF(report);
    
    // Send to management
    await this.sendMonthlyReport(report, pdfPath);
    
    return report;
  }
  
  static async generateCustomReport(params) {
    const {
      startDate,
      endDate,
      metrics = [],
      segments = [],
      format = 'json',
      includeCharts = true,
      emailRecipients = []
    } = params;
    
    // Calculate requested metrics
    const reportData = {
      period: 'custom',
      dateRange: { start: startDate, end: endDate },
      generatedAt: new Date(),
      parameters: params,
      data: {}
    };
    
    // Calculate each requested metric
    for (const metric of metrics) {
      switch (metric) {
        case 'user_growth':
          reportData.data.userGrowth = await this.calculateUserGrowth(startDate, endDate);
          break;
        case 'revenue_analysis':
          reportData.data.revenueAnalysis = await this.analyzeRevenue(startDate, endDate);
          break;
        case 'conversion_funnel':
          reportData.data.conversionFunnel = await this.analyzeConversionFunnel(startDate, endDate);
          break;
        case 'geographic_distribution':
          reportData.data.geographicDistribution = await this.analyzeGeographicDistribution(startDate, endDate);
          break;
        case 'customer_segments':
          reportData.data.customerSegments = await this.analyzeCustomerSegments(startDate, endDate);
          break;
      }
    }
    
    // Generate output in requested format
    let output;
    switch (format) {
      case 'pdf':
        output = await this.generateCustomPDF(reportData);
        break;
      case 'excel':
        output = await this.generateExcelReport(reportData);
        break;
      case 'html':
        output = await this.generateHTMLReport(reportData);
        break;
      default:
        output = reportData;
    }
    
    // Send to recipients if specified
    if (emailRecipients.length > 0) {
      await this.sendCustomReport(reportData, output, emailRecipients, format);
    }
    
    return output;
  }
  
  // Helper methods
  static async calculateWeeklySummary(startDate, endDate) {
    const Booking = mongoose.model('Booking');
    const User = mongoose.model('User');
    
    const [bookingStats, userStats, revenueTrend] = await Promise.all([
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            confirmed: {
              $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
            },
            revenue: { $sum: '$totalAmount' },
            avgValue: { $avg: '$totalAmount' }
          }
        }
      ]),
      
      User.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate }
          }
        },
        {
          $group: {
            _id: null,
            newUsers: { $sum: 1 },
            activeUsers: {
              $sum: {
                $cond: [
                  { $gt: ['$lastLogin', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)] },
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
            revenue: { $sum: '$totalAmount' }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);
    
    return {
      bookings: {
        total: bookingStats[0]?.total || 0,
        confirmed: bookingStats[0]?.confirmed || 0,
        conversionRate: bookingStats[0]?.total > 0 ?
          (bookingStats[0]?.confirmed / bookingStats[0]?.total) * 100 : 0,
        revenue: bookingStats[0]?.revenue || 0,
        avgValue: bookingStats[0]?.avgValue || 0
      },
      users: {
        new: userStats[0]?.newUsers || 0,
        active: userStats[0]?.activeUsers || 0,
        growthRate: await this.calculateGrowthRate('users', startDate, endDate)
      },
      revenue: {
        total: bookingStats[0]?.revenue || 0,
        dailyTrend: revenueTrend,
        weekOverWeekGrowth: await this.calculateWeekOverWeekGrowth(startDate, endDate)
      }
    };
  }
  
  static async generateCharts(data, type = 'line') {
    // Generate chart data for reports
    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext('2d');
    
    // Chart drawing logic
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 800, 400);
    
    // Draw chart based on type
    switch (type) {
      case 'line':
        // Draw line chart
        break;
      case 'bar':
        // Draw bar chart
        break;
      case 'pie':
        // Draw pie chart
        break;
    }
    
    return canvas.toBuffer();
  }
  
  static async sendEmailReport(report, recipients = ['admin@gotrip.africa']) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: recipients.join(','),
      subject: `Go Trip ${report.period.charAt(0).toUpperCase() + report.period.slice(1)} Report`,
      html: this.generateEmailHTML(report),
      attachments: report.attachments || []
    };
    
    await transporter.sendMail(mailOptions);
  }
  
  static generateEmailHTML(report) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .container { max-width: 800px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px; }
          .header { background: #4CAF50; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .metric-card { background: white; padding: 20px; margin: 10px 0; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
          .metric-value { font-size: 24px; font-weight: bold; color: #4CAF50; }
          .insight { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 10px 0; }
          .recommendation { background: #d1ecf1; border-left: 4px solid #0dcaf0; padding: 15px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 Go Trip ${report.period.charAt(0).toUpperCase() + report.period.slice(1)} Analytics Report</h1>
            <p>Generated: ${new Date().toLocaleDateString()}</p>
          </div>
          
          ${report.metrics ? `
            <div class="metric-card">
              <h3>📈 Key Metrics</h3>
              <p>Total Revenue: <span class="metric-value">$${report.metrics.totalRevenue?.toLocaleString() || 0}</span></p>
              <p>Total Bookings: <span class="metric-value">${report.metrics.totalBookings?.toLocaleString() || 0}</span></p>
              <p>New Users: <span class="metric-value">${report.metrics.newUsers?.toLocaleString() || 0}</span></p>
              <p>Conversion Rate: <span class="metric-value">${report.metrics.conversionRate?.toFixed(2) || 0}%</span></p>
            </div>
          ` : ''}
          
          ${report.insights?.length > 0 ? `
            <div class="insight">
              <h3>💡 Insights</h3>
              ${report.insights.map(insight => `<p>• ${insight}</p>`).join('')}
            </div>
          ` : ''}
          
          ${report.recommendations?.length > 0 ? `
            <div class="recommendation">
              <h3>🎯 Recommendations</h3>
              ${report.recommendations.map(rec => `<p>• ${rec}</p>`).join('')}
            </div>
          ` : ''}
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This report was automatically generated by the Go Trip Analytics System.
            Visit the dashboard for more detailed analytics.
          </p>
        </div>
      </body>
      </html>
    `;
  }
}