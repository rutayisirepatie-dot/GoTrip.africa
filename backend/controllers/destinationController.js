const Destination = require('../models/Destination');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
exports.getDestinations = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-rating.average',
      search,
      province,
      activities,
      minPrice,
      maxPrice,
      difficulty
    } = req.query;

    // Build filter
    const filter = { isActive: true };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (province) filter.province = province;
    if (activities) filter.activities = { $in: activities.split(',') };
    if (difficulty) filter.difficultyLevel = difficulty;
    
    if (minPrice || maxPrice) {
      filter['priceRange.min'] = {};
      if (minPrice) filter['priceRange.min'].$gte = Number(minPrice);
      if (maxPrice) filter['priceRange.max'].$lte = Number(maxPrice);
    }

    // Execute query with pagination
    const destinations = await Destination.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-meta')
      .populate('guides', 'name specialty rating')
      .populate('nearbyAccommodations', 'name type startingPrice');

    // Get total count
    const total = await Destination.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: destinations.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: destinations
    });

  } catch (error) {
    logger.error(`Get destinations error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
// @access  Public
exports.getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate('guides', 'name specialty languages experienceYears rating price')
      .populate('nearbyAccommodations', 'name type category location startingPrice rating');

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    // Increment views
    await destination.incrementViews();

    res.status(200).json({
      success: true,
      data: destination
    });

  } catch (error) {
    logger.error(`Get destination error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create destination
// @route   POST /api/destinations
// @access  Private/Admin
exports.createDestination = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const destination = await Destination.create(req.body);

    // Emit socket event for new destination
    if (req.io) {
      req.io.emit('new-destination', {
        message: 'New destination added',
        destination: destination.name
      });
    }

    res.status(201).json({
      success: true,
      data: destination,
      message: 'Destination created successfully'
    });

  } catch (error) {
    logger.error(`Create destination error: ${error.message}`);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Destination with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private/Admin
exports.updateDestination = async (req, res) => {
  try {
    let destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    // Update destination
    destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: destination,
      message: 'Destination updated successfully'
    });

  } catch (error) {
    logger.error(`Update destination error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    // Soft delete by setting isActive to false
    destination.isActive = false;
    await destination.save();

    res.status(200).json({
      success: true,
      message: 'Destination deleted successfully'
    });

  } catch (error) {
    logger.error(`Delete destination error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get featured destinations
// @route   GET /api/destinations/featured
// @access  Public
exports.getFeaturedDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({ isActive: true })
      .sort('-popularity -rating.average')
      .limit(6)
      .select('name location description images priceRange rating slug');

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations
    });

  } catch (error) {
    logger.error(`Get featured destinations error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get related destinations
// @route   GET /api/destinations/:id/related
// @access  Public
exports.getRelatedDestinations = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    const related = await Destination.find({
      _id: { $ne: destination._id },
      province: destination.province,
      isActive: true,
      $or: [
        { activities: { $in: destination.activities } },
        { difficultyLevel: destination.difficultyLevel }
      ]
    })
    .limit(4)
    .select('name location description images priceRange rating slug');

    res.status(200).json({
      success: true,
      count: related.length,
      data: related
    });

  } catch (error) {
    logger.error(`Get related destinations error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create review for destination
// @route   POST /api/destinations/:id/reviews
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

    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = destination.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this destination'
      });
    }

    const review = {
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    };

    destination.reviews.push(review);
    destination.rating.count = destination.reviews.length;

    // Calculate average rating
    const total = destination.reviews.reduce((sum, review) => sum + review.rating, 0);
    destination.rating.average = total / destination.reviews.length;

    await destination.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: review
    });

  } catch (error) {
    logger.error(`Create review error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get destination reviews
// @route   GET /api/destinations/:id/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .select('reviews')
      .populate('reviews.user', 'name avatar');

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.status(200).json({
      success: true,
      count: destination.reviews.length,
      data: destination.reviews
    });

  } catch (error) {
    logger.error(`Get reviews error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Increment destination views
// @route   POST /api/destinations/:id/view
// @access  Public
exports.incrementViews = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    await destination.incrementViews();

    res.status(200).json({
      success: true,
      message: 'View counted'
    });

  } catch (error) {
    logger.error(`Increment views error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all destinations (admin)
// @route   GET /api/destinations/admin/all
// @access  Private/Admin
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find()
      .sort('-createdAt')
      .populate('guides', 'name')
      .populate('nearbyAccommodations', 'name');

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations
    });

  } catch (error) {
    logger.error(`Get all destinations error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update destination status
// @route   PUT /api/destinations/:id/status
// @access  Private/Admin
exports.updateStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.status(200).json({
      success: true,
      data: destination,
      message: `Destination ${isActive ? 'activated' : 'deactivated'} successfully`
    });

  } catch (error) {
    logger.error(`Update status error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};