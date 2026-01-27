import express from 'express';
import Translator from '../models/Translator.js';

const router = express.Router();

// GET all translators
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      featured,
      available,
      search,
      language,
      service,
      minRate,
      maxRate,
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

    // Service filter
    if (service) {
      query.translationServices = new RegExp(service, 'i');
    }

    // Rate range filter
    if (minRate || maxRate) {
      query.dailyRate = {};
      if (minRate) query.dailyRate.$gte = Number(minRate);
      if (maxRate) query.dailyRate.$lte = Number(maxRate);
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { title: new RegExp(search, 'i') },
        { biography: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') },
        { 'languages.language': new RegExp(search, 'i') }
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

    const [translators, total] = await Promise.all([
      Translator.find(query)
        .select('-detailedBio -metaKeywords -createdAt -updatedAt -__v')
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      
      Translator.countDocuments(query)
    ]);

    // Increment views
    if (translators.length > 0) {
      const viewPromises = translators.map(translator => 
        Translator.findByIdAndUpdate(translator._id, { $inc: { views: 1 } })
      );
      await Promise.all(viewPromises);
    }

    res.json({
      success: true,
      count: translators.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: translators
    });
  } catch (error) {
    console.error('❌ Get translators error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch translators'
    });
  }
});

// GET single translator by ID
router.get('/:id', async (req, res) => {
  try {
    const translator = await Translator.findById(req.params.id);
    
    if (!translator) {
      return res.status(404).json({
        success: false,
        message: 'Translator not found'
      });
    }

    // Increment views
    translator.views += 1;
    await translator.save();

    res.json({
      success: true,
      data: translator
    });
  } catch (error) {
    console.error('❌ Get translator error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch translator'
    });
  }
});

// GET translator by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const translator = await Translator.findOne({ 
      slug: req.params.slug,
      available: true 
    });
    
    if (!translator) {
      return res.status(404).json({
        success: false,
        message: 'Translator not found'
      });
    }

    // Increment views
    translator.views += 1;
    await translator.save();

    res.json({
      success: true,
      data: translator
    });
  } catch (error) {
    console.error('❌ Get translator by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch translator'
    });
  }
});

export default router;