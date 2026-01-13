// backend/routes/admin.js
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Import models
import User from "../models/User.js";
import Guide from "../models/Guide.js";
import Destination from "../models/Destination.js";
import Accommodation from "../models/Accommodation.js";
import Booking from "../models/Booking.js";
import TripPlan from "../models/TripPlan.js";
import Contact from "../models/Contact.js";
import Newsletter from "../models/Newsletter.js";
import Blog from "../models/Blog.js";
import Translator from "../models/Translator.js";

// Import Admin model
import Admin from "../models/Admin.js";

// ---------------- ADMIN AUTHENTICATION MIDDLEWARE ----------------
const isAuthenticated = (req, res, next) => {
  // Check session
  if (req.session && req.session.admin) {
    return next();
  }

  // Check API key header
  const apiKey = req.headers["x-admin-api-key"];
  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    return next();
  }

  // Check Bearer token
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    if (token === process.env.ADMIN_API_KEY) {
      return next();
    }
  }

  res.status(401).json({
    success: false,
    message: "Unauthorized access. Admin privileges required.",
  });
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.session.admin) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!roles.includes(req.session.admin.role)) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions",
        requiredRoles: roles,
        yourRole: req.session.admin.role,
      });
    }

    next();
  };
};

// Apply authentication to all admin routes
router.use(isAuthenticated);

// ---------------- DASHBOARD & STATISTICS ----------------
router.get("/dashboard/stats", async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const [
      totalUsers,
      totalGuides,
      totalDestinations,
      totalBookings,
      totalBlogs,
      totalContacts,
      newUsersThisWeek,
      newUsersThisMonth,
      newBookingsThisWeek,
      newBookingsThisMonth,
      recentBookings,
      recentUsers,
      revenueData,
      bookingsByStatus,
      monthlyRevenue,
      blogStats,
    ] = await Promise.all([
      User.countDocuments(),
      Guide.countDocuments(),
      Destination.countDocuments(),
      Booking.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
      Contact.countDocuments(),
      User.countDocuments({ createdAt: { $gte: oneWeekAgo } }),
      User.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
      Booking.countDocuments({ createdAt: { $gte: oneWeekAgo } }),
      Booking.countDocuments({ createdAt: { $gte: oneMonthAgo } }),
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("user", "name email")
        .populate("destination", "name")
        .lean(),
      User.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select("name email createdAt profileImage")
        .lean(),
      Booking.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Booking.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Booking.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            revenue: { $sum: "$totalAmount" },
            bookings: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        { $limit: 6 },
      ]),
      Blog.aggregate([
        {
          $group: {
            _id: null,
            totalViews: { $sum: "$views" },
            totalLikes: { $sum: { $size: "$likes" } },
            totalComments: { $sum: { $size: "$comments" } },
          },
        },
      ]),
    ]);

    // Calculate growth percentages
    const userGrowth = newUsersThisMonth > 0 
      ? Math.round((newUsersThisMonth / totalUsers) * 100 * 10) / 10 
      : 0;
    
    const bookingGrowth = newBookingsThisMonth > 0 
      ? Math.round((newBookingsThisMonth / totalBookings) * 100 * 10) / 10 
      : 0;

    res.json({
      success: true,
      stats: {
        totals: {
          users: totalUsers,
          guides: totalGuides,
          destinations: totalDestinations,
          bookings: totalBookings,
          blogs: totalBlogs,
          contacts: totalContacts,
          revenue: revenueData[0]?.total || 0,
        },
        growth: {
          users: userGrowth,
          bookings: bookingGrowth,
          usersThisWeek: newUsersThisWeek,
          bookingsThisWeek: newBookingsThisWeek,
        },
        bookingsByStatus: bookingsByStatus.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        monthlyRevenue,
        blogStats: blogStats[0] || {
          totalViews: 0,
          totalLikes: 0,
          totalComments: 0,
        },
      },
      recent: {
        bookings: recentBookings,
        users: recentUsers,
      },
    });
  } catch (error) {
    console.error("❌ Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
});

// ---------------- USER MANAGEMENT ----------------
router.get("/users", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = "",
      role = "",
      country = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // Role filter
    if (role) {
      query.role = role;
    }

    // Country filter
    if (country) {
      query.country = { $regex: country, $options: "i" };
    }

    const users = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("❌ Get users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
});

router.get("/users/:id", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get user's bookings
    const bookings = await Booking.find({ user: req.params.id })
      .populate("destination", "name")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: user,
      bookings,
    });
  } catch (error) {
    console.error("❌ Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});

router.put("/users/:id", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent updating sensitive fields
    delete updates.password;
    delete updates._id;
    delete updates.__v;

    // Only admins can change role to admin
    if (updates.role === "admin" && req.session.admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only administrators can assign admin role",
      });
    }

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("❌ Update user error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
});

router.delete("/users/:id", hasRole("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete related data
    await Promise.all([
      Booking.deleteMany({ user: req.params.id }),
      TripPlan.deleteMany({ user: req.params.id }),
    ]);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
});

// ---------------- BOOKING MANAGEMENT ----------------
router.get("/bookings", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status = "",
      paymentStatus = "",
      startDate = "",
      endDate = "",
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Status filter
    if (status) {
      query.status = status;
    }

    // Payment status filter
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    // Search filter
    if (search) {
      query.$or = [
        { transactionId: { $regex: search, $options: "i" } },
        { "user.name": { $regex: search, $options: "i" } },
        { "destination.name": { $regex: search, $options: "i" } },
      ];
    }

    const bookings = await Booking.find(query)
      .populate("user", "name email phone")
      .populate("destination", "name country")
      .populate("guide", "name")
      .populate("accommodation", "name")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });

    const total = await Booking.countDocuments(query);

    // Calculate revenue
    const revenue = await Booking.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.json({
      success: true,
      data: bookings,
      summary: {
        totalRevenue: revenue[0]?.total || 0,
        totalBookings: total,
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ Get bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
});

router.put("/bookings/:id/status", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "confirmed", "completed", "cancelled", "refunded"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking status updated",
      data: booking,
    });
  } catch (error) {
    console.error("❌ Update booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking",
    });
  }
});

// ---------------- GUIDE MANAGEMENT ----------------
router.get("/guides", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const guides = await Guide.find()
      .sort({ rating: -1 })
      .limit(50);

    res.json({
      success: true,
      data: guides,
    });
  } catch (error) {
    console.error("❌ Get guides error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch guides",
    });
  }
});

// ---------------- DESTINATION MANAGEMENT ----------------
router.get("/destinations", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const destinations = await Destination.find()
      .sort({ popularity: -1 })
      .limit(50);

    res.json({
      success: true,
      data: destinations,
    });
  } catch (error) {
    console.error("❌ Get destinations error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch destinations",
    });
  }
});

// ---------------- BLOG MANAGEMENT ----------------
router.get("/blogs", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      published = "",
      featured = "",
      category = "",
      search = "",
    } = req.query;

    const skip = (page - 1) * limit;

    let query = {};

    // Published filter
    if (published !== "") {
      query.isPublished = published === "true";
    }

    // Featured filter
    if (featured !== "") {
      query.isFeatured = featured === "true";
    }

    // Category filter
    if (category) {
      query.categories = category;
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(query)
      .populate("author", "name email")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ publishedAt: -1 });

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ Get blogs error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
});

router.post("/blogs", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const blogData = req.body;

    // Set author to current admin if not provided
    if (!blogData.author && req.session.admin) {
      blogData.author = req.session.admin.id;
    }

    const blog = new Blog(blogData);
    await blog.save();

    const populatedBlog = await Blog.findById(blog._id)
      .populate("author", "name email");

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: populatedBlog,
    });
  } catch (error) {
    console.error("❌ Create blog error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create blog",
      error: error.message,
    });
  }
});

router.put("/blogs/:id", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const blog = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("author", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error("❌ Update blog error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to update blog",
      error: error.message,
    });
  }
});

router.delete("/blogs/:id", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete blog error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
});

// ---------------- CONTACT MESSAGE MANAGEMENT ----------------
router.get("/contacts", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const { page = 1, limit = 20, status = "" } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ Get contacts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contact messages",
    });
  }
});

router.put("/contacts/:id/status", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;

    const updates = { status };
    
    if (response) {
      updates.response = {
        message: response.message,
        respondedBy: req.session.admin.username,
        respondedAt: new Date(),
      };
    }

    const contact = await Contact.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.json({
      success: true,
      message: "Contact status updated",
      data: contact,
    });
  } catch (error) {
    console.error("❌ Update contact error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update contact",
    });
  }
});

// ---------------- NEWSLETTER MANAGEMENT ----------------
router.get("/newsletters", hasRole("editor", "supervisor", "admin"), async (req, res) => {
  try {
    const subscribers = await Newsletter.find()
      .sort({ subscribedAt: -1 })
      .limit(100);

    const total = await Newsletter.countDocuments();
    const active = await Newsletter.countDocuments({ isActive: true });

    res.json({
      success: true,
      data: subscribers,
      stats: {
        total,
        active,
        inactive: total - active,
      },
    });
  } catch (error) {
    console.error("❌ Get newsletters error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch newsletter subscribers",
    });
  }
});

// ---------------- SYSTEM SETTINGS ----------------
router.get("/settings", hasRole("supervisor", "admin"), async (req, res) => {
  try {
    // Get system info
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      env: process.env.NODE_ENV,
      database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      databaseName: mongoose.connection.name,
    };

    // Count collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionStats = await Promise.all(
      collections.map(async (col) => {
        const count = await mongoose.connection.db.collection(col.name).countDocuments();
        return {
          name: col.name,
          count,
        };
      })
    );

    res.json({
      success: true,
      data: {
        systemInfo,
        collections: collectionStats,
        settings: {
          siteName: "GoTrip Africa",
          maintenanceMode: false,
          registrationEnabled: true,
          bookingEnabled: true,
          maxFileSize: "5MB",
          allowedFileTypes: ["image/jpeg", "image/png", "image/gif"],
        },
      },
    });
  } catch (error) {
    console.error("❌ Get settings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch system settings",
    });
  }
});

// ---------------- ADMIN USER MANAGEMENT ----------------
router.get("/admins", hasRole("admin"), async (req, res) => {
  try {
    const admins = await Admin.find()
      .select("-password")
      .sort({ role: 1 });

    res.json({
      success: true,
      data: admins,
    });
  } catch (error) {
    console.error("❌ Get admins error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin users",
    });
  }
});

router.post("/admins", hasRole("admin"), async (req, res) => {
  try {
    const { username, password, name, email, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this username or email already exists",
      });
    }

    const admin = new Admin({
      username,
      password, // Will be hashed by pre-save middleware
      name,
      email,
      role: role || "editor",
    });

    await admin.save();

    // Remove password from response
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: adminResponse,
    });
  } catch (error) {
    console.error("❌ Create admin error:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create admin",
      error: error.message,
    });
  }
});

// ---------------- BACKUP & MAINTENANCE ----------------
router.post("/backup", hasRole("admin"), async (req, res) => {
  try {
    // In production, you would implement actual backup logic here
    // This is a placeholder for backup functionality
    
    const backupInfo = {
      timestamp: new Date().toISOString(),
      collections: await mongoose.connection.db.listCollections().toArray(),
      message: "Backup functionality would be implemented here",
    };

    res.json({
      success: true,
      message: "Backup initiated (placeholder)",
      data: backupInfo,
    });
  } catch (error) {
    console.error("❌ Backup error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate backup",
    });
  }
});

// ---------------- LOGS & ACTIVITY ----------------
router.get("/activity", hasRole("supervisor", "admin"), async (req, res) => {
  try {
    // Get recent activity from various collections
    const [recentBookings, recentUsers, recentContacts, recentBlogs] = await Promise.all([
      Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "name")
        .select("status totalAmount createdAt"),
      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email createdAt"),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email subject status createdAt"),
      Blog.find()
        .sort({ publishedAt: -1 })
        .limit(5)
        .select("title isPublished publishedAt"),
    ]);

    res.json({
      success: true,
      data: {
        bookings: recentBookings,
        users: recentUsers,
        contacts: recentContacts,
        blogs: recentBlogs,
      },
    });
  } catch (error) {
    console.error("❌ Get activity error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recent activity",
    });
  }
});

export default router;