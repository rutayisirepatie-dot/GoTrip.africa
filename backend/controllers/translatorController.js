const Translator = require('../models/Translator');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');
const sendEmail = require('../utils/sendEmail');

// @desc    Get all translators
// @route   GET /api/translators
// @access  Public
exports.getTranslators = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-rating.average',
      search,
      specialty,
      languages,
      minPrice,
      maxPrice,
      availability
    } = req.query;

    // Build filter
    const filter = { isActive: true, isVerified: true };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (specialty) filter.specialty = specialty;
    if (availability) filter.availability = availability;
    
    if (languages) {
      const langArray = languages.split(',');
      filter.$or = [
        { 'languages.source': { $in: langArray } },
        { 'languages.target': { $in: langArray } }
      ];
    }
    
    if (minPrice || maxPrice) {
      filter['price.dailyRate'] = {};
      if (minPrice) filter['price.dailyRate'].$gte = Number(minPrice);
      if (maxPrice) filter['price.dailyRate'].$lte = Number(maxPrice);
    }

    // Execute query with pagination
    const translators = await Translator.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'name email phone avatar');

    // Get total count
    const total = await Translator.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: translators.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: translators
    });

  } catch (error) {
    logger.error(`Get translators error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single translator
// @route   GET /api/translators/:id
// @access  Public
exports.getTranslator = async (req, res) => {
  try {
    const translator = await Translator.findById(req.params.id)
      .populate('user', 'name email phone avatar')
      .populate('reviews.user', 'name avatar');

    if (!translator) {
      return res.status(404).json({
        success: false,
        message: 'Translator not found'
      });
    }

    res.status(200).json({
      success: true,
      data: translator
    });

  } catch (error) {
    logger.error(`Get translator error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get featured translators
// @route   GET /api/translators/featured
// @access  Public
exports.getFeaturedTranslators = async (req, res) => {
  try {
    const translators = await Translator.find({ 
      isActive: true, 
      isVerified: true,
      availability: 'available'
    })
    .sort('-rating.average -experienceYears')
    .limit(6)
    .populate('user', 'name avatar')
    .select('name specialty languages experienceYears price rating user');

    res.status(200).json({
      success: true,
      count: translators.length,
      data: translators
    });

  } catch (error) {
    logger.error(`Get featured translators error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Apply as a translator
// @route   POST /api/translators/apply
// @access  Private/User
exports.applyAsTranslator = async (req, res) => {
  try {
    const {
      specialty,
      languages,
      experienceYears,
      bio,
      certifications,
      serviceTypes,
      industries
    } = req.body;

    // Check if user already has a translator profile
    const existingTranslator = await Translator.findOne({ user: req.user.id });
    if (existingTranslator) {
      return res.status(400).json({
        success: false,
        message: 'You already have a translator profile'
      });
    }

    // Create translator profile
    const translatorData = {
      user: req.user.id,
      name: req.user.name,
      specialty,
      languages: languages.map(lang => ({
        source: lang.source,
        target: lang.target,
        direction: lang.direction || 'both',
        proficiency: lang.proficiency || 'fluent'
      })),
      experienceYears,
      bio,
      certifications: certifications || [],
      serviceTypes: serviceTypes || [],
      industries: industries || [],
      price: {
        dailyRate: calculateTranslatorPrice(experienceYears, languages.length),
        currency: 'USD',
        negotiable: true
      }
    };

    const translator = await Translator.create(translatorData);

    // Update user role to translator
    await User.findByIdAndUpdate(req.user.id, { role: 'translator' });

    // Send notification email to admin
    const adminEmails = await User.find({ role: 'admin' }).select('email');
    
    if (adminEmails.length > 0) {
      const message = `
        <h1>New Translator Application</h1>
        <p>A new translator has applied to join Adventure HillBound:</p>
        <ul>
          <li><strong>Name:</strong> ${req.user.name}</li>
          <li><strong>Email:</strong> ${req.user.email}</li>
          <li><strong>Specialty:</strong> ${specialty}</li>
          <li><strong>Experience:</strong> ${experienceYears} years</li>
          <li><strong>Languages:</strong> ${languages.map(l => `${l.source} to ${l.target}`).join(', ')}</li>
        </ul>
        <p>Please review and verify this application in the admin panel.</p>
      `;

      adminEmails.forEach(async admin => {
        await sendEmail({
          email: admin.email,
          subject: 'New Translator Application - Adventure HillBound',
          html: message
        });
      });
    }

    res.status(201).json({
      success: true,
      data: translator,
      message: 'Translator application submitted successfully. Our team will review your application.'
    });

  } catch (error) {
    logger.error(`Apply as translator error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update translator profile
// @route   PUT /api/translators/profile
// @access  Private/Translator
exports.updateTranslatorProfile = async (req, res) => {
  try {
    const translator = await Translator.findOne({ user: req.user.id });

    if (!translator) {
      return res.status(404).json({
        success: false,
        message: 'Translator profile not found'
      });
    }

    // Only allow updates to certain fields
    const allowedUpdates = [
      'specialty', 'languages', 'bio', 'certifications', 
      'serviceTypes', 'industries', 'equipment'
    ];
    
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Update price if experience or languages changed
    if (req.body.experienceYears || req.body.languages) {
      const newExperience = req.body.experienceYears || translator.experienceYears;
      const newLanguages = req.body.languages || translator.languages;
      updates['price.dailyRate'] = calculateTranslatorPrice(
        newExperience,
        Array.isArray(newLanguages) ? newLanguages.length : translator.languages.length
      );
    }

    const updatedTranslator = await Translator.findOneAndUpdate(
      { user: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedTranslator,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    logger.error(`Update translator profile error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get my translator profile
// @route   GET /api/translators/my-profile
// @access  Private/Translator
exports.getMyTranslatorProfile = async (req, res) => {
  try {
    const translator = await Translator.findOne({ user: req.user.id })
      .populate('user', 'name email phone avatar')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name avatar'
        }
      });

    if (!translator) {
      return res.status(404).json({
        success: false,
        message: 'Translator profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: translator
    });

  } catch (error) {
    logger.error(`Get my translator profile error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get translator reviews
// @route   GET /api/translators/:id/reviews
// @access  Public
exports.getTranslatorReviews = async (req, res) => {
  try {
    const translator = await Translator.findById(req.params.id)
      .select('reviews rating')
      .populate('reviews.user', 'name avatar');

    if (!translator) {
      return res.status(404).json({
        success: false,
        message: 'Translator not found'
      });
    }

    res.status(200).json({
      success: true,
      count: translator.reviews.length,
      rating: translator.rating,
      data: translator.reviews
    });

  } catch (error) {
    logger.error(`Get translator reviews error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create translator (admin)
// @route   POST /api/translators
// @access  Private/Admin
exports.createTranslator = async (req, res) => {
  try {
    const translator = await Translator.create(req.body);

    // Update user role if user field exists
    if (translator.user) {
      await User.findByIdAndUpdate(translator.user, { role: 'translator' });
    }

    res.status(201).json({
      success: true,
      data: translator,
      message: 'Translator created successfully'
    });

  } catch (error) {
    logger.error(`Create translator error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update translator (admin)
// @route   PUT /api/translators/:id
// @access  Private/Admin
exports.updateTranslator = async (req, res) => {
  try {
    const translator = await Translator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!translator) {
      return res.status(404).json({
        success: false,
        message: 'Translator not found'
      });
    }

    res.status(200).json({
      success: true,
      data: translator,
      message: 'Translator updated successfully'
    });

  } catch (error) {
    logger.error(`Update translator error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete translator (admin)
// @route   DELETE /api/translators/:id
// @access  Private/Admin
exports.deleteTranslator = async (req, res) => {
  try {
    const translator = await Translator.findById(req.params.id);

    if (!translator) {
      return res.status(404).json({
        success: false,
        message: 'Translator not found'
      });
    }

    // Update user role back to user
    if (translator.user) {
      await User.findByIdAndUpdate(translator.user, { role: 'user' });
    }

    // Soft delete
    translator.isActive = false;
    await translator.save();

    res.status(200).json({
      success: true,
      message: 'Translator deleted successfully'
    });

  } catch (error) {
    logger.error(`Delete translator error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Verify translator (admin)
// @route   PUT /api/translators/:id/verify
// @access  Private/Admin
exports.verifyTranslator = async (req, res) => {
  try {
    const translator = await Translator.findById(req.params.id);

    if (!translator) {
      return res.status(404).json({
        success: false,
        message: 'Translator not found'
      });
    }

    translator.isVerified = true;
    translator.verificationDate = new Date();
    translator.verificationNotes = req.body.notes || 'Verified by admin';
    
    await translator.save();

    // Send verification email to translator
    if (translator.user) {
      const user = await User.findById(translator.user);
      if (user && user.email) {
        const message = `
          <h1>Congratulations! Your Translator Account is Verified</h1>
          <p>Dear ${translator.name},</p>
          <p>Your translator account has been verified and is now active on Adventure HillBound.</p>
          <p>You can now start receiving translation requests from clients.</p>
          <p>Please complete your profile and set your availability to start your journey as a certified translator.</p>
          <p>If you have any questions, please contact our support team.</p>
          <p>Welcome to the Adventure HillBound family!</p>
        `;

        await sendEmail({
          email: user.email,
          subject: 'Translator Account Verified - Adventure HillBound',
          html: message
        });
      }
    }

    res.status(200).json({
      success: true,
      data: translator,
      message: 'Translator verified successfully'
    });

  } catch (error) {
    logger.error(`Verify translator error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Helper function to calculate translator price
const calculateTranslatorPrice = (experienceYears, languageCount) => {
  let basePrice = 80; // Base price for translators
  let experienceMultiplier = 1 + (experienceYears * 0.05);
  let languageMultiplier = 1 + (languageCount * 0.02);
  
  let calculatedPrice = Math.round(basePrice * experienceMultiplier * languageMultiplier);
  
  // Apply caps: $80-$150 per day
  calculatedPrice = Math.max(80, Math.min(150, calculatedPrice));
  
  return calculatedPrice;
};