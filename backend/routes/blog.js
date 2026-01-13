// backend/routes/blog.js
import express from "express";
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLike,
  addComment,
  moderateComment,
  getBlogStats,
} from "../controllers/blogController.js";

const router = express.Router();

// Public routes
router.get("/", getBlogs);
router.get("/stats", getBlogStats);
router.get("/:id", getBlog);

// Protected routes (add authentication middleware as needed)
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.post("/:id/like", toggleLike);
router.post("/:id/comments", addComment);
router.put("/:id/comments/:commentId/moderate", moderateComment);

export default router;