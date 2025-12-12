// backend/controllers/blogController.js
import Blog from '../models/Blog.js';
import logger from '../utils/logger.js';

// Get all blogs
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    logger.error(`Error fetching blogs: ${error.message}`);
    next(error);
  }
};

// Get blog by ID
export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (error) {
    logger.error(`Error fetching blog by ID: ${error.message}`);
    next(error);
  }
};

// Create a new blog
export const createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    logger.error(`Error creating blog: ${error.message}`);
    next(error);
  }
};

// Update a blog
export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (error) {
    logger.error(`Error updating blog: ${error.message}`);
    next(error);
  }
};

// Delete a blog
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    logger.error(`Error deleting blog: ${error.message}`);
    next(error);
  }
};