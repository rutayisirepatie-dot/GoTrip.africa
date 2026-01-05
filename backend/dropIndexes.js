// backend/dropIndexes.js
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import Guide from "./models/Guide.js";
import Translator from "./models/Translator.js";

dotenv.config({ path: path.resolve("./backend/.env") });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔗 MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const dropIndexes = async () => {
  try {
    await connectDB();

    // Drop email index on guides
    const guideIndexes = await Guide.collection.indexes();
    console.log("Existing Guide indexes:", guideIndexes);

    if (guideIndexes.some(idx => idx.key.email)) {
      await Guide.collection.dropIndex("email_1");
      console.log("✅ Dropped unique email index on Guides");
    } else {
      console.log("ℹ️ No email index found on Guides");
    }

    // Drop email index on translators if needed
    const translatorIndexes = await Translator.collection.indexes();
    console.log("Existing Translator indexes:", translatorIndexes);

    if (translatorIndexes.some(idx => idx.key.email)) {
      await Translator.collection.dropIndex("email_1");
      console.log("✅ Dropped unique email index on Translators");
    } else {
      console.log("ℹ️ No email index found on Translators");
    }

    process.exit();
  } catch (error) {
    console.error("❌ Error dropping indexes:", error);
    process.exit(1);
  }
};

dropIndexes();