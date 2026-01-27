import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// GET all published blogs
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      featured,
      category,
      tag,
      search,
      author,
      sort = '-publishedDate'
    } = req.query;

    const query = { published: true };

    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }

    // Category filter
    if (category) {
      query.category = new RegExp(category, 'i');
    }

    // Tag filter
    if (tag) {
      query.tags = new RegExp(tag, 'i');
    }

    // Author filter
    if (author) {
      query.author = new RegExp(author, 'i');
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { excerpt: new RegExp(search, 'i') },
        { content: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') }
      ];
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'views':
        sortOption = { views: -1 };
        break;
      case 'likes':
        sortOption = { likes: -1 };
        break;
      case 'oldest':
        sortOption = { publishedDate: 1 };
        break;
      case 'title':
        sortOption = { title: 1 };
        break;
      default:
        sortOption = { publishedDate: -1 };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .select('-metaKeywords -createdAt -updatedAt -__v')
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      
      Blog.countDocuments(query)
    ]);

    // Increment views
    if (blogs.length > 0) {
      const viewPromises = blogs.map(blog => 
        Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } })
      );
      await Promise.all(viewPromises);
    }

    res.json({
      success: true,
      count: blogs.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: blogs
    });
  } catch (error) {
    console.error('❌ Get blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs'
    });
  }
});

// GET single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      _id: req.params.id,
      published: true 
    });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('❌ Get blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog'
    });
  }
});

// GET blog by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug,
      published: true 
    });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('❌ Get blog by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog'
    });
  }
});

// GET featured blogs
router.get('/featured/featured', async (req, res) => {
  try {
    const blogs = await Blog.find({ 
      featured: true,
      published: true 
    })
    .select('title excerpt featuredImage author category readTime publishedDate views')
    .sort('-publishedDate')
    .limit(6)
    .lean();

    res.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('❌ Get featured blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured blogs'
    });
  }
});

// GET blogs by category
router.get('/category/:category', async (req, res) => {
  try {
    const blogs = await Blog.find({ 
      category: new RegExp(req.params.category, 'i'),
      published: true 
    })
    .select('title excerpt featuredImage author category readTime publishedDate')
    .sort('-publishedDate')
    .limit(20)
    .lean();

    res.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('❌ Get blogs by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs by category'
    });
  }
});

export default router;