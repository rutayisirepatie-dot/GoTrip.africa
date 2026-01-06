// backend/routes/upload.js
import express from "express";
import upload, { uploadToCloudinary } from "../middleware/upload.js";

const router = express.Router();

// PROFILE PHOTO
router.post("/profile", upload.single("image"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(
      req.file.buffer,
      "gotrip/profiles"
    );

    res.json({ success: true, imageUrl: result.secure_url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// NEWS IMAGE
router.post("/news", upload.single("image"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(
      req.file.buffer,
      "gotrip/news"
    );

    res.json({ success: true, imageUrl: result.secure_url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;