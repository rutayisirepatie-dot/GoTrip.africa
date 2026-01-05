// backend/seedData.js
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import crypto from "crypto";
import slugify from "slugify";

import User from "./models/User.js";
import Guide from "./models/Guide.js";
import Translator from "./models/Translator.js";
import Destination from "./models/Destination.js";
import Accommodation from "./models/Accommodation.js";
import Blog from "./models/Blog.js";
import Booking from "./models/Booking.js";
import TripPlan from "./models/TripPlan.js";
import Contact from "./models/Contact.js";
import Newsletter from "./models/Newsletter.js";

// Load environment variables
dotenv.config({ path: path.resolve("./backend/.env") });

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔗 MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Helper functions
const generateBookingReference = () => "BK-" + crypto.randomBytes(5).toString("hex").toUpperCase();

// Mock data
const mockData = {
  destinations: [
    { name: "Volcanoes National Park", country: "Rwanda", description: "Gorilla trekking in the Virunga Mountains." },
    { name: "Lake Kivu", country: "Rwanda", description: "Beautiful lake with beaches and water sports." },
    { name: "Nyungwe Forest National Park", country: "Rwanda", description: "Rainforest with chimpanzees and canopy walk." },
    { name: "Kigali City", country: "Rwanda", description: "Capital city with museums, markets, and culture." },
  ],
  accommodations: [
    { name: "Volcano Lodge", destinationName: "Volcanoes National Park", address: "Main Road", type: "Luxury Eco-Lodge", dailyRate: 250, features: ["WiFi","Breakfast"], image: "./images/volcano-lodge.jpg" },
    { name: "Lake Kivu Resort", destinationName: "Lake Kivu", address: "Lakeshore Drive", type: "Luxury Resort", dailyRate: 200, features: ["Pool","Spa","Breakfast"], image: "./images/lake-kivu-resort.jpg" },
    { name: "Nyungwe Forest Lodge", destinationName: "Nyungwe Forest National Park", address: "Forest Trail", type: "Luxury Eco-Lodge", dailyRate: 220, features: ["WiFi","Hiking","Breakfast"], image: "./images/nyungwe-lodge.jpg" },
    { name: "Kigali Business Hotel", destinationName: "Kigali City", address: "Downtown Street", type: "Business Hotel", dailyRate: 180, features: ["WiFi","Conference Room"], image: "./images/kigali-hotel.jpg" },
  ],
  guides: [
    { firstName: "Jean Claude", lastName: "N.", phone:"123456789", languages:["English","French"], specialty:"Gorilla Trekking", experienceYears:8, dailyRate:150, rating:4.9, available:true, image:"./images/jean-claude.jpg" },
    { firstName: "Marie Aimee", lastName:"K.", phone:"987654321", languages:["English","Kinyarwanda"], specialty:"Cultural Tours", experienceYears:6, dailyRate:160, rating:4.8, available:true, image:"./images/marie-aimee.jpg" },
    { firstName: "Eric", lastName:"B.", phone:"555555555", languages:["English","German"], specialty:"Bird Watching", experienceYears:5, dailyRate:140, rating:4.7, available:true, image:"./images/eric-b.jpg" },
    { firstName: "Alice", lastName:"M.", phone:"111222333", languages:["English","French"], specialty:"Photography Tours", experienceYears:7, dailyRate:155, rating:4.8, available:true, image:"./images/alice-m.jpg" },
  ],
  translators: [
    { firstName:"Patience", lastName:"Rutayisire", phone:"123456789", languages:["English","German"], specialty:"Tourism", experienceYears:5, dailyRate:140, rating:4.9, available:true, image:"./images/patie.png" },
    { firstName:"Eric", lastName:"M.", phone:"987654321", languages:["English","Chinese"], specialty:"Medical", experienceYears:8, dailyRate:150, rating:4.8, available:true, image:"./images/eric-m.jpg" },
    { firstName:"Celine", lastName:"K.", phone:"555444333", languages:["English","French"], specialty:"Business", experienceYears:6, dailyRate:145, rating:4.7, available:true, image:"./images/celine-k.jpg" },
    { firstName:"David", lastName:"T.", phone:"222333444", languages:["English","Spanish"], specialty:"Technical", experienceYears:7, dailyRate:150, rating:4.8, available:true, image:"./images/david-t.jpg" },
  ],
  users: [
    { name: "Alice M.", firstName:"Alice", lastName:"M.", email:"alice@example.com", password:"password123" },
    { name: "Bob K.", firstName:"Bob", lastName:"K.", email:"bob@example.com", password:"password123" },
    { name: "Charlie L.", firstName:"Charlie", lastName:"L.", email:"charlie@example.com", password:"password123" },
    { name: "Diana S.", firstName:"Diana", lastName:"S.", email:"diana@example.com", password:"password123" },
  ],
  blogs: [
    { title:"Top 5 Gorilla Trekking Tips", content:"Lorem ipsum...", author:"Admin" },
    { title:"Lake Kivu Attractions", content:"Lorem ipsum...", author:"Admin" },
    { title:"Nyungwe Forest Guide", content:"Lorem ipsum...", author:"Admin" },
    { title:"Kigali City Travel Guide", content:"Lorem ipsum...", author:"Admin" },
  ],
  contacts: [
    { name:"Visitor 1", email:"visitor1@example.com", message:"I want more info." },
    { name:"Visitor 2", email:"visitor2@example.com", message:"Booking question." },
    { name:"Visitor 3", email:"visitor3@example.com", message:"How to book?" },
    { name:"Visitor 4", email:"visitor4@example.com", message:"Pricing inquiry." },
  ],
  newsletters: [
    { email:"subscriber1@example.com" },
    { email:"subscriber2@example.com" },
    { email:"subscriber3@example.com" },
    { email:"subscriber4@example.com" },
  ],
};

// Seed function
const seedData = async () => {
  try {
    // Clear all collections
    await User.deleteMany({});
    await Guide.deleteMany({});
    await Translator.deleteMany({});
    await Destination.deleteMany({});
    await Accommodation.deleteMany({});
    await Blog.deleteMany({});
    await Booking.deleteMany({});
    await TripPlan.deleteMany({});
    await Contact.deleteMany({});
    await Newsletter.deleteMany({});
    console.log("🧹 Database cleared");

    // Insert destinations
    const insertedDestinations = await Destination.insertMany(mockData.destinations);
    const getDestinationId = (name) => insertedDestinations.find(d => d.name === name)?._id;

    // Insert accommodations (with unique slugs)
    for (const acc of mockData.accommodations) {
      const destId = getDestinationId(acc.destinationName);
      if (!destId) continue;
      const newAcc = new Accommodation({ ...acc, destination: destId });
      await newAcc.save();
      console.log(`Inserted Accommodation: ${newAcc.name} -> ${newAcc.slug}`);
    }

    // Insert guides and translators
    await Guide.insertMany(mockData.guides);
    await Translator.insertMany(mockData.translators);

    // Insert users
    const insertedUsers = await User.insertMany(mockData.users);

    // Insert blogs with unique slugs
    for (const blog of mockData.blogs) {
      let baseSlug = slugify(blog.title, { lower: true, strict: true });
      let slug = baseSlug;
      let count = 1;
      while (await mongoose.models.Blog.exists({ slug })) {
        slug = `${baseSlug}-${count}`;
        count++;
      }
      blog.slug = slug;
    }
    await Blog.insertMany(mockData.blogs);

    // Insert bookings
    const accommodations = await Accommodation.find({});
    const bookingsData = insertedUsers.flatMap(user =>
      accommodations.map(acc => ({
        user: user._id,
        accommodation: acc._id,
        bookingReference: generateBookingReference(),
        startDate: new Date(),
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        totalPrice: acc.dailyRate * 3,
      }))
    );
    await Booking.insertMany(bookingsData);

    // Insert trip plans with titles
    const tripPlansData = insertedUsers.map((user, index) => ({
      user: user._id,
      title: `Trip Plan ${index + 1}`, // ✅ required field
      destinations: insertedDestinations.map(d => d._id),
      guides: [],
      translators: [],
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      totalCost: 0,
      notes: "Sample trip plan",
      status: "planned",
    }));
    await TripPlan.insertMany(tripPlansData);

    // Insert contacts
    await Contact.insertMany(mockData.contacts);

    // Insert newsletters
    await Newsletter.insertMany(mockData.newsletters);

    console.log("🌱 All 10 models seeded successfully with 4+ entries each!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

// Run seed
const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();