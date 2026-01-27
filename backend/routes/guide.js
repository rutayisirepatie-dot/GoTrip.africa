import express from 'express';
import Guide from '../models/Guide.js';

const router = express.Router();

// GET all guides
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      featured,
      available,
      search,
      language,
      minRate,
      maxRate,
      minExperience,
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

    // Language filter
    if (language) {
      query['languages.language'] = new RegExp(language, 'i');
    }

    // Rate range filter
    if (minRate || maxRate) {
      query.dailyRate = {};
      if (minRate) query.dailyRate.$gte = Number(minRate);
      if (maxRate) query.dailyRate.$lte = Number(maxRate);
    }

    // Minimum experience filter
    if (minExperience) {
      query.experienceYears = { $gte: Number(minExperience) };
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { title: new RegExp(search, 'i') },
        { biography: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') },
        { destinationsExpertise: new RegExp(search, 'i') }
      ];
    }

    // Sort options
    let sortOption = {};
    switch (sort) {
      case 'rate-asc':
        sortOption = { dailyRate: 1 };
        break;
      case 'rate-desc':
        sortOption = { dailyRate: -1 };
        break;
      case 'experience':
        sortOption = { experienceYears: -1 };
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

    const [guides, total] = await Promise.all([
      Guide.find(query)
        .select('-detailedBio -metaKeywords -createdAt -updatedAt -__v')
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      
      Guide.countDocuments(query)
    ]);

    // Increment views
    if (guides.length > 0) {
      const viewPromises = guides.map(guide => 
        Guide.findByIdAndUpdate(guide._id, { $inc: { views: 1 } })
      );
      await Promise.all(viewPromises);
    }

    res.json({
      success: true,
      count: guides.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: guides
    });
  } catch (error) {
    console.error('❌ Get guides error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch guides'
    });
  }
});

// GET single guide by ID
router.get('/:id', async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    
    if (!guide) {
      return res.status(404).json({
        success: false,
        message: 'Guide not found'
      });
    }

    // Increment views
    guide.views += 1;
    await guide.save();

    res.json({
      success: true,
      data: guide
    });
  } catch (error) {
    console.error('❌ Get guide error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch guide'
    });
  }
});

// GET guide by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const guide = await Guide.findOne({ 
      slug: req.params.slug,
      available: true 
    });
    
    if (!guide) {
      return res.status(404).json({
        success: false,
        message: 'Guide not found'
      });
    }

    // Increment views
    guide.views += 1;
    await guide.save();

    res.json({
      success: true,
      data: guide
    });
  } catch (error) {
    console.error('❌ Get guide by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch guide'
    });
  }
});

// GET featured guides
router.get('/featured/featured', async (req, res) => {
  try {
    const guides = await Guide.find({ 
      featured: true,
      available: true 
    })
    .select('name title image rating dailyRate experienceYears languages destinationsExpertise')
    .sort('-rating')
    .limit(6)
    .lean();

    res.json({
      success: true,
      count: guides.length,
      data: guides
    });
  } catch (error) {
    console.error('❌ Get featured guides error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured guides'
    });
  }
});

// GET guides by language
router.get('/language/:language', async (req, res) => {
  try {
    const guides = await Guide.find({ 
      'languages.language': new RegExp(req.params.language, 'i'),
      available: true 
    })
    .select('name title image rating languages dailyRate experienceYears')
    .sort('-rating')
    .lean();

    res.json({
      success: true,
      count: guides.length,
      data: guides
    });
  } catch (error) {
    console.error('❌ Get guides by language error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch guides by language'
    });
  }
});

export default router;