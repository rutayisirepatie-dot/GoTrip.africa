import express from 'express';
import Translator from '../models/Translator.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// ====================
// GET all translators (public)
// ====================
router.get('/', async (req, res) => {
  try {
    const { available, country, city, minRate, maxRate, languages } = req.query;
    const filter = {};

    // Filter by availability
    if (available !== undefined) {
      filter.available = available === 'true';
    } else {
      filter.available = true; // Default to available translators only
    }

    // Filter by country
    if (country) {
      filter.country = { $regex: country, $options: 'i' };
    }

    // Filter by city
    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    // Filter by daily rate range
    if (minRate || maxRate) {
      filter.dailyRate = {};
      if (minRate) filter.dailyRate.$gte = Number(minRate);
      if (maxRate) filter.dailyRate.$lte = Number(maxRate);
    }

    // Filter by languages
    if (languages) {
      const languageArray = languages.split(',').map(lang => lang.trim());
      filter.languages = { $in: languageArray.map(lang => new RegExp(lang, 'i')) };
    }

    // Sorting options
    const sort = {};
    if (req.query.sortBy) {
      const sortParts = req.query.sortBy.split(':');
      sort[sortParts[0]] = sortParts[1] === 'desc' ? -1 : 1;
    }

    const translators = await Translator.find(filter).sort(sort);
    
    res.json({ 
      success: true, 
      count: translators.length,
      data: translators 
    });
  } catch (error) {
    console.error('Get translators error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch translators', 
      error: error.message 
    });
  }
});

// ====================
// GET translator by slug (public)
// ====================
router.get('/slug/:slug', async (req, res) => {
  try {
    const translator = await Translator.findOne({ slug: req.params.slug });
    if (!translator) {
      return res.status(404).json({ 
        success: false, 
        message: 'Translator not found' 
      });
    }

    res.json({ 
      success: true, 
      data: translator 
    });
  } catch (error) {
    console.error('Get translator by slug error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch translator', 
      error: error.message 
    });
  }
});

// ====================
// GET single translator by ID (public)
// ====================
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid translator ID' 
      });
    }

    const translator = await Translator.findById(req.params.id);
    if (!translator) {
      return res.status(404).json({ 
        success: false, 
        message: 'Translator not found' 
      });
    }

    res.json({ 
      success: true, 
      data: translator 
    });
  } catch (error) {
    console.error('Get translator error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch translator', 
      error: error.message 
    });
  }
});

// ====================
// CREATE translator (admin only)
// ====================
router.post('/', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    // Match your Translator model schema
    const { 
      name, email, phone, country, city, languages, 
      dailyRate, experienceYears, bio, available, 
      rating, specializations, image, certifications 
    } = req.body;

    // Basic validation - match model required fields
    if (!name || !email || !phone || !country || !city || 
        dailyRate === undefined || experienceYears === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, phone, country, city, dailyRate and experienceYears are required' 
      });
    }

    // Check if translator already exists
    const existingTranslator = await Translator.findOne({ email });
    if (existingTranslator) {
      return res.status(400).json({ 
        success: false, 
        message: 'Translator with this email already exists' 
      });
    }

    const translator = new Translator({
      name, 
      email, 
      phone, 
      country, 
      city,
      languages: languages || [], 
      dailyRate: dailyRate || 150,
      experienceYears: experienceYears || 0,
      bio: bio || '',
      available: available !== undefined ? available : true,
      rating: rating || 0,
      specializations: specializations || [],
      certifications: certifications || [],
      image: image || ''
    });

    await translator.save();

    res.status(201).json({ 
      success: true, 
      message: 'Translator created successfully', 
      data: translator 
    });
  } catch (error) {
    console.error('Create translator error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Translator with this email or slug already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create translator', 
      error: error.message 
    });
  }
});

// ====================
// UPDATE translator (admin only)
// ====================
router.put('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid translator ID' 
      });
    }

    const translator = await Translator.findById(req.params.id);
    if (!translator) {
      return res.status(404).json({ 
        success: false, 
        message: 'Translator not found' 
      });
    }

    // Update only provided fields (match your Translator model schema)
    const updatableFields = [
      'name', 'email', 'phone', 'country', 'city', 'languages',
      'dailyRate', 'experienceYears', 'bio', 'available',
      'rating', 'specializations', 'image', 'certifications'
    ];
    
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        translator[field] = req.body[field];
      }
    });

    // If name is being updated, slug will be regenerated automatically
    // due to the pre-save hook in the model

    await translator.save();
    res.json({ 
      success: true, 
      message: 'Translator updated successfully', 
      data: translator 
    });
  } catch (error) {
    console.error('Update translator error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Duplicate email or slug detected' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update translator', 
      error: error.message 
    });
  }
});

// ====================
// ADD REVIEW to translator (authenticated users)
// ====================
router.post('/:id/reviews', authenticateToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid translator ID' 
      });
    }

    const translator = await Translator.findById(req.params.id);
    if (!translator) {
      return res.status(404).json({ 
        success: false, 
        message: 'Translator not found' 
      });
    }

    const { rating, comment } = req.body;
    const userName = req.user.name || req.user.username || 'Anonymous';

    // Validate rating
    if (!rating || rating < 0 || rating > 5) {
      return res.status(400).json({ 
        success: false, 
        message: 'Rating must be between 0 and 5' 
      });
    }

    // Add review
    translator.reviews.push({
      userName,
      rating,
      comment: comment || '',
      date: new Date()
    });

    // Update average rating
    const totalRating = translator.reviews.reduce((sum, review) => sum + review.rating, 0);
    translator.rating = totalRating / translator.reviews.length;

    await translator.save();

    res.json({ 
      success: true, 
      message: 'Review added successfully', 
      data: translator.reviews[translator.reviews.length - 1] 
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add review', 
      error: error.message 
    });
  }
});

// ====================
// DELETE translator (admin only)
// ====================
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid translator ID' 
      });
    }

    const translator = await Translator.findById(req.params.id);
    if (!translator) {
      return res.status(404).json({ 
        success: false, 
        message: 'Translator not found' 
      });
    }

    await Translator.findByIdAndDelete(req.params.id);
    res.json({ 
      success: true, 
      message: 'Translator deleted successfully' 
    });
  } catch (error) {
    console.error('Delete translator error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete translator', 
      error: error.message 
    });
  }
});

export default router;