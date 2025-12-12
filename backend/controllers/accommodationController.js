const Accommodation = require('../models/Accommodation');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// @desc    Get all accommodations
// @route   GET /api/accommodations
// @access  Public
exports.getAccommodations = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-rating.average',
      search,
      type,
      category,
      province,
      minPrice,
      maxPrice,
      amenities
    } = req.query;

    // Build filter
    const filter = { isActive: true, isVerified: true };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (province) filter['location.province'] = province;
    
    if (amenities) {
      filter['amenities.name'] = { $in: amenities.split(',') };
    }
    
    if (minPrice || maxPrice) {
      filter['rooms.price.nightly'] = {};
      if (minPrice) filter['rooms.price.nightly'].$gte = Number(minPrice);
      if (maxPrice) filter['rooms.price.nightly'].$lte = Number(maxPrice);
    }

    // Execute query with pagination
    const accommodations = await Accommodation.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count
    const total = await Accommodation.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: accommodations.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: accommodations
    });

  } catch (error) {
    logger.error(`Get accommodations error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single accommodation
// @route   GET /api/accommodations/:id
// @access  Public
exports.getAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id)
      .populate('reviews.user', 'name avatar');

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    // Increment views or similar metric if needed
    res.status(200).json({
      success: true,
      data: accommodation
    });

  } catch (error) {
    logger.error(`Get accommodation error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get featured accommodations
// @route   GET /api/accommodations/featured
// @access  Public
exports.getFeaturedAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ 
      isActive: true, 
      isVerified: true,
      category: { $in: ['luxury', 'boutique'] }
    })
    .sort('-rating.average')
    .limit(6)
    .select('name type category location images startingPrice rating');

    res.status(200).json({
      success: true,
      count: accommodations.length,
      data: accommodations
    });

  } catch (error) {
    logger.error(`Get featured accommodations error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create review for accommodation
// @route   POST /api/accommodations/:id/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = accommodation.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this accommodation'
      });
    }

    const review = {
      user: req.user.id,
      rating: {
        overall: req.body.rating,
        categories: req.body.categories || {}
      },
      comment: req.body.comment,
      stayDate: req.body.stayDate,
      roomType: req.body.roomType
    };

    accommodation.reviews.push(review);
    
    // Update rating
    await accommodation.updateRating();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: review
    });

  } catch (error) {
    logger.error(`Create accommodation review error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get accommodation reviews
// @route   GET /api/accommodations/:id/reviews
// @access  Public
exports.getAccommodationReviews = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id)
      .select('reviews rating')
      .populate('reviews.user', 'name avatar');

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    res.status(200).json({
      success: true,
      count: accommodation.reviews.length,
      rating: accommodation.rating,
      data: accommodation.reviews
    });

  } catch (error) {
    logger.error(`Get accommodation reviews error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create accommodation (admin/partner)
// @route   POST /api/accommodations
// @access  Private/Admin/Partner
exports.createAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.create(req.body);

    res.status(201).json({
      success: true,
      data: accommodation,
      message: 'Accommodation created successfully'
    });

  } catch (error) {
    logger.error(`Create accommodation error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update accommodation (admin/partner)
// @route   PUT /api/accommodations/:id
// @access  Private/Admin/Partner
exports.updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: accommodation,
      message: 'Accommodation updated successfully'
    });

  } catch (error) {
    logger.error(`Update accommodation error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete accommodation (admin)
// @route   DELETE /api/accommodations/:id
// @access  Private/Admin
exports.deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    // Soft delete
    accommodation.isActive = false;
    await accommodation.save();

    res.status(200).json({
      success: true,
      message: 'Accommodation deleted successfully'
    });

  } catch (error) {
    logger.error(`Delete accommodation error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all accommodations (admin)
// @route   GET /api/accommodations/admin/all
// @access  Private/Admin
exports.getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find()
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: accommodations.length,
      data: accommodations
    });

  } catch (error) {
    logger.error(`Get all accommodations error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update accommodation status (admin)
// @route   PUT /api/accommodations/:id/status
// @access  Private/Admin
exports.updateStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: accommodation,
      message: `Accommodation ${isActive ? 'activated' : 'deactivated'} successfully`
    });

  } catch (error) {
    logger.error(`Update accommodation status error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Verify accommodation (admin)
// @route   PUT /api/accommodations/:id/verify
// @access  Private/Admin
exports.verifyAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    accommodation.isVerified = true;
    accommodation.verificationDate = new Date();
    accommodation.verificationNotes = req.body.notes || 'Verified by admin';
    
    await accommodation.save();

    res.status(200).json({
      success: true,
      data: accommodation,
      message: 'Accommodation verified successfully'
    });

  } catch (error) {
    logger.error(`Verify accommodation error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};