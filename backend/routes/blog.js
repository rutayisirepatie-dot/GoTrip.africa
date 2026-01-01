// backend/routes/blog.js
import express from 'express';
import Blog from '../models/Blog.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// ======================
// CREATE BLOG (admin only)
// ======================
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { title, content, tags, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const blog = new Blog({
      title,
      content,
      tags: Array.isArray(tags) ? tags : [],
      image: image || '',
      author: req.user._id // logged-in admin becomes the author
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ success: false, message: 'Failed to create blog post', error: error.message });
  }
});

// ======================
// GET ALL BLOGS (public)
// ======================
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email role'); // show author's name, email, role

    res.json({ success: true, data: blogs });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs', error: error.message });
  }
});

// ======================
// GET SINGLE BLOG (public)
// ======================
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email role');

    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch blog', error: error.message });
  }
});

// ======================
// UPDATE BLOG (admin only)
// ======================
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const { title, content, tags, image } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        tags: Array.isArray(tags) ? tags : [],
        image: image || ''
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) return res.status(404).json({ success: false, message: 'Blog not found' });

    res.json({ success: true, message: 'Blog updated successfully', data: updatedBlog });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ success: false, message: 'Failed to update blog', error: error.message });
  }
});

// ======================
// DELETE BLOG (admin only)
// ======================
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    await blog.remove();

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete blog', error: error.message });
  }
});

export default router;