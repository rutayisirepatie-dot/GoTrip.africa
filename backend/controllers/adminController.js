import User from "../models/User.js";
import Guide from "../models/Guide.js";
import Destination from "../models/Destination.js";
import Booking from "../models/Booking.js";
import TripPlan from "../models/TripPlan.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalGuides,
      totalDestinations,
      totalBookings,
      totalTrips,
      recentBookings,
      recentUsers,
      revenueData
    ] = await Promise.all([
      User.countDocuments(),
      Guide.countDocuments(),
      Destination.countDocuments(),
      Booking.countDocuments(),
      TripPlan.countDocuments(),
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("user", "name email")
        .populate("destination", "name"),
      User.find().sort({ createdAt: -1 }).limit(10).select("name email createdAt"),
      Booking.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ])
    ]);

    // Get bookings by status
    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // Get monthly revenue for chart
    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          revenue: { $sum: "$totalAmount" },
          bookings: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalGuides,
        totalDestinations,
        totalBookings,
        totalTrips,
        totalRevenue: revenueData[0]?.total || 0,
        bookingsByStatus: bookingsByStatus.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        monthlyRevenue
      },
      recent: {
        bookings: recentBookings,
        users: recentUsers
      }
    });
  } catch (error) {
    console.error("❌ Dashboard stats error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch dashboard stats" 
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ]
      };
    }

    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("❌ Get users error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch users" 
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove sensitive fields
    delete updates.password;
    delete updates._id;

    const user = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      user
    });
  } catch (error) {
    console.error("❌ Update user error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update user" 
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Delete related bookings
    await Booking.deleteMany({ user: req.params.id });

    res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("❌ Delete user error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete user" 
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const status = req.query.status;
    const search = req.query.search;

    let query = {};
    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { transactionId: { $regex: search, $options: "i" } },
        { "user.name": { $regex: search, $options: "i" } }
      ];
    }

    const bookings = await Booking.find(query)
      .populate("user", "name email phone")
      .populate("destination", "name country")
      .populate("guide", "name")
      .populate("accommodation", "name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("❌ Get bookings error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch bookings" 
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("user", "name email");

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: "Booking not found" 
      });
    }

    res.json({
      success: true,
      message: "Booking status updated",
      booking
    });
  } catch (error) {
    console.error("❌ Update booking error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update booking" 
    });
  }
};