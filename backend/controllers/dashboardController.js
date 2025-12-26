import Booking from '../models/bookingModel.js';
import TripPlan from '../models/tripPlanModel.js';
import User from '../models/userModel.js';

// Get user dashboard stats
export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const bookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    const tripPlans = await TripPlan.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(3);
    
    const stats = {
      totalBookings: await Booking.countDocuments({ user: userId }),
      upcomingBookings: await Booking.countDocuments({ 
        user: userId, 
        status: { $in: ['confirmed', 'pending'] },
        date: { $gte: new Date() }
      }),
      completedBookings: await Booking.countDocuments({ 
        user: userId, 
        status: 'completed' 
      }),
      pendingTripPlans: await TripPlan.countDocuments({ 
        user: userId, 
        status: 'pending' 
      }),
      totalSpent: await Booking.aggregate([
        { $match: { user: userId, paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ])
    };
    
    res.json({
      success: true,
      data: {
        stats,
        recentBookings: bookings,
        recentTripPlans: tripPlans,
        user: req.user
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get admin dashboard stats
export const getAdminDashboard = async (req, res) => {
  try {
    // Recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('-password');
    
    // Recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');
    
    // Recent trip plans
    const recentTripPlans = await TripPlan.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'name email');
    
    // Statistics
    const [usersCount, bookingsCount, revenueData] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Booking.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      Booking.aggregate([
        { 
          $match: { 
            createdAt: { 
              $gte: new Date(new Date().setDate(new Date().getDate() - 30)) 
            } 
          } 
        },
        { $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }},
        { $sort: { _id: 1 } }
      ])
    ]);
    
    // Monthly revenue
    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          revenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        stats: {
          totalUsers: usersCount,
          totalBookings: bookingsCount,
          totalRevenue: revenueData[0]?.total || 0,
          activeBookings: await Booking.countDocuments({ status: 'confirmed' }),
          pendingTripPlans: await TripPlan.countDocuments({ status: 'pending' })
        },
        recentUsers,
        recentBookings,
        recentTripPlans,
        monthlyRevenue,
        activityLogs: await getRecentActivity()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', role = '' } = req.query;
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) {
      query.role = role;
    }
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await User.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        users,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all bookings (admin only)
export const getAllBookings = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status = '', 
      serviceType = '',
      startDate = '',
      endDate = ''
    } = req.query;
    
    const query = {};
    
    if (status) query.status = status;
    if (serviceType) query.serviceType = serviceType;
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Booking.countDocuments(query);
    
    // Calculate revenue stats
    const revenueStats = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: {
        _id: null,
        totalRevenue: { $sum: '$totalAmount' },
        avgBookingValue: { $avg: '$totalAmount' },
        count: { $sum: 1 }
      }}
    ]);
    
    res.json({
      success: true,
      data: {
        bookings,
        revenueStats: revenueStats[0] || { totalRevenue: 0, avgBookingValue: 0, count: 0 },
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update booking status (admin only)
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus, notes } = req.body;
    
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    const updates = {};
    if (status) updates.status = status;
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    if (notes) updates.adminNotes = notes;
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).populate('user', 'name email');
    
    // Log activity
    await createActivityLog({
      action: 'booking_updated',
      user: req.user._id,
      details: {
        bookingId: id,
        previousStatus: booking.status,
        newStatus: status,
        previousPaymentStatus: booking.paymentStatus,
        newPaymentStatus: paymentStatus
      }
    });
    
    res.json({
      success: true,
      data: updatedBooking,
      message: 'Booking updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, serviceType } = req.query;
    
    const query = { user: userId };
    if (status) query.status = status;
    if (serviceType) query.serviceType = serviceType;
    
    const bookings = await Booking.find(query)
      .sort({ date: 1 });
    
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;
    
    // Remove fields that shouldn't be updated
    delete updates.password;
    delete updates.role;
    delete updates.email;
    
    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true }
    ).select('-password');
    
    res.json({
      success: true,
      data: user,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user by admin
export const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).select('-password');
    
    // Log activity
    await createActivityLog({
      action: 'user_updated',
      user: req.user._id,
      details: {
        targetUserId: id,
        updates: updates
      }
    });
    
    res.json({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    const booking = await Booking.findOne({ _id: id, user: userId });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    if (booking.status === 'completed') {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot cancel completed booking' 
      });
    }
    
    booking.status = 'cancelled';
    booking.updatedAt = new Date();
    await booking.save();
    
    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper function for activity logs
async function createActivityLog(data) {
  // Implement activity logging logic
  // This could be saved to a separate ActivityLog model
  console.log('Activity Log:', data);
}

async function getRecentActivity() {
  // Fetch recent activities from ActivityLog model
  return [];
}