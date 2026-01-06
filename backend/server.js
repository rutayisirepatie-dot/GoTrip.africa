// backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

// ---------------- ENV ----------------
dotenv.config({ path: "./backend/.env" });

const app = express();
const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI;

// ---------------- MIDDLEWARE ----------------
app.use(express.json());

// FIXED CORS CONFIGURATION - Allows both www and non-www versions
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "https://gotrip.africa",
      "https://www.gotrip.africa", // ADDED THIS
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://gotrip-backend-uwhn.onrender.com" // Allow the backend itself
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin"]
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ---------------- MONGODB ----------------
mongoose
  .connect(MONGO_URI, {
    maxPoolSize: 10,
  })
  .then(() => console.log("🔗 Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ---------------- MODELS ----------------
import User from "./models/User.js";
import Guide from "./models/Guide.js";
import Translator from "./models/Translator.js";
import Destination from "./models/Destination.js";
import Accommodation from "./models/Accommodation.js";
import Booking from "./models/Booking.js";
import TripPlan from "./models/TripPlan.js";
import Contact from "./models/Contact.js";
import Newsletter from "./models/Newsletter.js";

// ---------------- ROUTES ----------------
import blogRoutes from "./routes/blog.js";
import contactRoutes from "./routes/contact.js";
import newsletterRoutes from "./routes/newsletter.js";
import uploadRoutes from "./routes/upload.js";

// ---------------- BASE ROUTES ----------------
app.get("/", (req, res) => {
  res.send("🚀 GoTrip API is running");
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
    message: "GoTrip API is healthy",
    cors: {
      allowedOrigins: [
        "https://gotrip.africa",
        "https://www.gotrip.africa",
        "http://localhost:5500"
      ]
    }
  });
});

// CORS test endpoint
app.get("/api/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "CORS is working correctly!",
    allowedOrigin: req.headers.origin || "Not specified",
    timestamp: new Date().toISOString(),
    corsHeaders: {
      "Access-Control-Allow-Origin": req.headers.origin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
});

// ---------------- GENERIC GET ROUTES ----------------
const registerGetRoutes = (
  path,
  Model,
  selectFields = "",
  populateFields = []
) => {
  app.get(path, async (req, res) => {
    try {
      let query = Model.find().select(selectFields);
      populateFields.forEach((field) => {
        query = query.populate(field);
      });

      const data = await query;
      res.json({ success: true, data });
    } catch (error) {
      console.error(`❌ GET ${path} error:`, error.message);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });
};

// ---------------- PUBLIC API ENDPOINTS ----------------
registerGetRoutes("/api/users", User, "-password");
registerGetRoutes("/api/guides", Guide, "", ["languages"]);
registerGetRoutes("/api/translators", Translator, "", ["languages"]);
registerGetRoutes("/api/destinations", Destination);
registerGetRoutes("/api/accommodations", Accommodation, "", ["destination"]);
registerGetRoutes("/api/bookings", Booking, "", ["user", "accommodation"]);
registerGetRoutes("/api/tripplans", TripPlan, "", [
  "user",
  "destinations",
  "guides",
  "translators",
]);

// ---------------- FEATURE ROUTES ----------------
app.use("/api/blogs", blogRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/newsletters", newsletterRoutes);

// IMAGE UPLOAD ROUTES (PROFILE + NEWS)
app.use("/api/upload", uploadRoutes);

// ---------------- 404 HANDLER ----------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ---------------- GLOBAL ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);
  
  // Handle CORS errors
  if (err.message.includes("CORS")) {
    return res.status(403).json({ 
      success: false, 
      message: "CORS policy violation",
      allowedOrigins: [
        "https://gotrip.africa",
        "https://www.gotrip.africa",
        "http://localhost:5500"
      ]
    });
  }
  
  res.status(500).json({ 
    success: false, 
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// ---------------- START SERVER ----------------
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 CORS Test: http://localhost:${PORT}/api/cors-test`);
  console.log(`✅ CORS configured for:`);
  console.log(`   - https://gotrip.africa`);
  console.log(`   - https://www.gotrip.africa`);
  console.log(`   - http://localhost:5500`);
});

// ---------------- GRACEFUL SHUTDOWN ----------------
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...");
  await mongoose.connection.close();
  console.log("🔒 MongoDB connection closed");
  server.close(() => process.exit(0));
});

export default app;