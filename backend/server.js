// server.js - Adventure HillBound Backend API

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// ============================
// CORS CONFIGURATION
// ============================

const allowedOrigins = [
  "http://localhost:3000", // React frontend
  "http://127.0.0.1:5500"  // Live Server / static HTML
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin like Postman or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS policy: This origin is not allowed"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// ============================
// MIDDLEWARE
// ============================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// MONGODB CONNECTION
// ============================

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/adventure_hillbound",)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ============================
// YOUR ROUTES HERE
// ============================

// Example health check route
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server running", timestamp: new Date() });
});

// ============================
// START SERVER
// ============================

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});