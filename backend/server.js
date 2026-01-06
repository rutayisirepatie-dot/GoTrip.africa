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

app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "https://gotrip.africa",
    ],
    credentials: true,
  })
);

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

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
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

// ---------------- START SERVER ----------------
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});

// ---------------- GRACEFUL SHUTDOWN ----------------
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...");
  await mongoose.connection.close();
  console.log("🔒 MongoDB connection closed");
  server.close(() => process.exit(0));
});

export default app;