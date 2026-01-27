import express from 'express';
import Accommodation from '../models/Accommodation.js';

const router = express.Router();

// GET all accommodations
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      featured,
      available,
      type,
      minPrice,
      maxPrice,
      location,
      search,
      sort = '-rating'
    } = req.query;

    const query = {};

    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }

    // Filter by availability
    if (available === 'true') {
      query.available = true;
    }

    // Type filter
    if (type) {
      query.type = type;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    // Location filter
    if (location) {
      query.location = new RegExp(location, 'i');
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
        sortOption = { pricePerNight: 1 };
        break;
      case 'price-desc':
        sortOption = { pricePerNight: -1 };
        break;
      case 'name':
        sortOption = { name: 1 };
        break;
      default:
        sortOption = { rating: -1 };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [accommodations, total] = await Promise.all([
      Accommodation.find(query)
        .select('-detailedDescription -metaKeywords -createdAt -updatedAt -__v')
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      
      Accommodation.countDocuments(query)
    ]);

    // Increment views
    if (accommodations.length > 0) {
      const viewPromises = accommodations.map(acc => 
        Accommodation.findByIdAndUpdate(acc._id, { $inc: { views: 1 } })
      );
      await Promise.all(viewPromises);
    }

    res.json({
      success: true,
      count: accommodations.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: accommodations
    });
  } catch (error) {
    console.error('❌ Get accommodations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch accommodations'
    });
  }
});

// GET single accommodation by ID
router.get('/:id', async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    
    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    // Increment views
    accommodation.views += 1;
    await accommodation.save();

    res.json({
      success: true,
      data: accommodation
    });
  } catch (error) {
    console.error('❌ Get accommodation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch accommodation'
    });
  }
});

// GET accommodation by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const accommodation = await Accommodation.findOne({ 
      slug: req.params.slug,
      available: true 
    });
    
    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    // Increment views
    accommodation.views += 1;
    await accommodation.save();

    res.json({
      success: true,
      data: accommodation
    });
  } catch (error) {
    console.error('❌ Get accommodation by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch accommodation'
    });
  }
});

export default router;