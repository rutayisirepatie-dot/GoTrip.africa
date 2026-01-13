import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
  },
  name: {
    type: String,
    trim: true
  },
  isSubscribed: {  // Changed from isActive to isSubscribed to match seed data
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  preferences: [{  // Changed from object to array of strings
    type: String,
    enum: ["travel_tips", "destination_updates", "special_offers", "newsletters", "promotions", "updates"],
    trim: true
  }],
  source: {
    type: String,
    enum: ["website_signup", "booking", "contact_form", "manual"],
    default: "website_signup"
  },
  unsubscribedAt: {
    type: Date
  },
  lastEmailSent: {
    type: Date
  }
}, {
  timestamps: true
});

// Create indexes for better performance
newsletterSchema.index({ email: 1 }, { unique: true });
newsletterSchema.index({ isSubscribed: 1 });
newsletterSchema.index({ subscribedAt: -1 });

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;