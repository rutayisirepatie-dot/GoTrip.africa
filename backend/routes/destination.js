import express from 'express';
import Destination from '../models/Destination.js';

const router = express.Router();

// GET all destinations
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      featured,
      trending,
      available,
      search,
      minPrice,
      maxPrice,
      location,
      difficulty,
      sort = '-rating'
    } = req.query;

    const query = {};

    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }

    // Filter by trending
    if (trending === 'true') {
      query.trending = true;
    }

    // Filter by availability
    if (available === 'true') {
      query.available = true;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.basePrice = {};
      if (minPrice) query.basePrice.$gte = Number(minPrice);
      if (maxPrice) query.basePrice.$lte = Number(maxPrice);
    }

    // Location filter
    if (location) {
      query.location = new RegExp(location, 'i');
    }

    // Difficulty filter
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { location: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') }
      ];
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'price-asc':
        sortOption = { basePrice: 1 };
        break;
      case 'price-desc':
        sortOption = { basePrice: -1 };
        break;
      case 'name':
        sortOption = { name: 1 };
        break;
      case 'popular':
        sortOption = { views: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { rating: -1 };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [destinations, total] = await Promise.all([
      Destination.find(query)
        .select('-detailedDescription -metaKeywords -createdAt -updatedAt -__v')
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      
      Destination.countDocuments(query)
    ]);

    // Increment views for popular destinations
    if (destinations.length > 0) {
      const viewPromises = destinations.map(dest => 
        Destination.findByIdAndUpdate(dest._id, { $inc: { views: 1 } })
      );
      await Promise.all(viewPromises);
    }

    res.json({
      success: true,
      count: destinations.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: destinations
    });
  } catch (error) {
    console.error('❌ Get destinations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch destinations'
    });
  }
});

// GET single destination by ID
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    // Increment views
    destination.views += 1;
    await destination.save();

    res.json({
      success: true,
      data: destination
    });
  } catch (error) {
    console.error('❌ Get destination error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch destination'
    });
  }
});

// GET destination by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const destination = await Destination.findOne({ 
      slug: req.params.slug,
      available: true 
    });
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    // Increment views
    destination.views += 1;
    await destination.save();

    res.json({
      success: true,
      data: destination
    });
  } catch (error) {
    console.error('❌ Get destination by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch destination'
    });
  }
});

// GET featured destinations
router.get('/featured/featured', async (req, res) => {
  try {
    const destinations = await Destination.find({ 
      featured: true,
      available: true 
    })
    .select('name slug shortDescription location mainImage rating basePrice duration')
    .sort('-rating')
    .limit(6)
    .lean();

    res.json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    console.error('❌ Get featured destinations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured destinations'
    });
  }
});

// GET trending destinations
router.get('/trending/trending', async (req, res) => {
  try {
    const destinations = await Destination.find({ 
      trending: true,
      available: true 
    })
    .select('name slug shortDescription location mainImage rating basePrice')
    .sort('-views')
    .limit(8)
    .lean();

    res.json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    console.error('❌ Get trending destinations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trending destinations'
    });
  }
});

// GET destinations by location
router.get('/location/:location', async (req, res) => {
  try {
    const destinations = await Destination.find({ 
      location: new RegExp(req.params.location, 'i'),
      available: true 
    })
    .select('name slug shortDescription location mainImage rating basePrice')
    .sort('-rating')
    .lean();

    res.json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    console.error('❌ Get destinations by location error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch destinations by location'
    });
  }
});

// POST create destination (admin only)
router.post('/', async (req, res) => {
  try {
    // Check admin session
    if (!req.session.admin) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const destinationData = req.body;
    
    // Generate slug if not provided
    if (!destinationData.slug && destinationData.name) {
      const slug = destinationData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      destinationData.slug = slug;
    }

    const destination = new Destination(destinationData);
    await destination.save();

    res.status(201).json({
      success: true,
      message: 'Destination created successfully',
      data: destination
    });
  } catch (error) {
    console.error('❌ Create destination error:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Destination with this name or slug already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create destination'
    });
  }
});

// PUT update destination (admin only)
router.put('/:id', async (req, res) => {
  try {
    if (!req.session.admin) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.json({
      success: true,
      message: 'Destination updated successfully',
      data: destination
    });
  } catch (error) {
    console.error('❌ Update destination error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update destination'
    });
  }
});

// DELETE destination (admin only)
router.delete('/:id', async (req, res) => {
  try {
    if (!req.session.admin) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const destination = await Destination.findByIdAndDelete(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.json({
      success: true,
      message: 'Destination deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete destination error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete destination'
    });
  }
});

export default router;