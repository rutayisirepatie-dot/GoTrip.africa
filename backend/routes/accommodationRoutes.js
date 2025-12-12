import express from 'express';
import Accommodation from '../models/Accommodation.js';
import Destination from '../models/Destination.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { validateAccommodation } from '../middleware/validationMiddleware.js';
import logger from '../utils/logger.js';

const router = express.Router();

// GET /api/accommodations - Get all accommodations (public)
router.get('/', async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      destination,
      type,
      minPrice,
      maxPrice,
      location,
      search,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build query
    let query = { isActive: true };

    // Filter by destination
    if (destination) {
      const dest = await Destination.findOne({ slug: destination });
      if (dest) {
        query.destination = dest._id;
      }
    }

    // Filter by type
    if (type) {
      query.type = { $in: type.split(',') };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query['priceRange.min'] = {};
      if (minPrice) query['priceRange.min'].$gte = Number(minPrice);
      if (maxPrice) query['priceRange.max'].$lte = Number(maxPrice);
    }

    // Filter by location
    if (location) {
      query.location = new RegExp(location, 'i');
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { location: new RegExp(search, 'i') }
      ];
    }

    // Execute query with pagination
    const accommodations = await Accommodation.find(query)
      .populate('destination', 'name slug images')
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Accommodation.countDocuments(query);

    res.json({
      success: true,
      count: accommodations.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: accommodations
    });

  } catch (error) {
    logger.error(`Error fetching accommodations: ${error.message}`);
    next(error);
  }
});

// GET /api/accommodations/:id - Get single accommodation (public)
router.get('/:id', async (req, res, next) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id)
      .populate('destination', 'name slug description images')
      .populate('createdBy', 'name email avatar');

    if (!accommodation || !accommodation.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    res.json({
      success: true,
      data: accommodation
    });

  } catch (error) {
    logger.error(`Error fetching accommodation ${req.params.id}: ${error.message}`);
    next(error);
  }
});

// GET /api/accommodations/slug/:slug - Get by slug (public)
router.get('/slug/:slug', async (req, res, next) => {
  try {
    const accommodation = await Accommodation.findOne({ slug: req.params.slug })
      .populate('destination', 'name slug description images')
      .populate('createdBy', 'name email avatar');

    if (!accommodation || !accommodation.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    res.json({
      success: true,
      data: accommodation
    });

  } catch (error) {
    logger.error(`Error fetching accommodation by slug ${req.params.slug}: ${error.message}`);
    next(error);
  }
});

// POST /api/accommodations - Create accommodation (admin only)
router.post('/', protect, authorize('admin'), validateAccommodation, async (req, res, next) => {
  try {
    console.log('Creating accommodation with data:', req.body);
    console.log('User creating:', req.user);

    // Check if destination exists
    const destinationExists = await Destination.findById(req.body.destination);
    if (!destinationExists) {
      return res.status(400).json({
        success: false,
        message: 'Destination not found'
      });
    }

    const accommodationData = {
      ...req.body,
      createdBy: req.user._id
    };

    const accommodation = new Accommodation(accommodationData);
    const savedAccommodation = await accommodation.save();

    console.log('Accommodation saved successfully:', savedAccommodation._id);

    // Emit socket event for real-time updates
    if (req.io) {
      req.io.emit('accommodation-created', {
        accommodation: savedAccommodation,
        createdBy: req.user.name
      });
    }

    res.status(201).json({
      success: true,
      message: 'Accommodation created successfully',
      data: savedAccommodation
    });

  } catch (error) {
    console.error('Error creating accommodation:', error);
    logger.error(`Error creating accommodation: ${error.message}`);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Accommodation with this name already exists'
      });
    }

    next(error);
  }
});

// PUT /api/accommodations/:id - Update accommodation (admin only)
router.put('/:id', protect, authorize('admin'), validateAccommodation, async (req, res, next) => {
  try {
    let accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    // Prevent changing destination if bookings exist
    if (req.body.destination && req.body.destination !== accommodation.destination.toString()) {
      // Check for existing bookings (you'll need to implement this)
      // const hasBookings = await Booking.exists({ accommodation: accommodation._id });
      // if (hasBookings) {
      //   return res.status(400).json({
      //     success: false,
      //     message: 'Cannot change destination because there are existing bookings'
      //   });
      // }
    }

    accommodation = await Accommodation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('destination', 'name slug');

    res.json({
      success: true,
      message: 'Accommodation updated successfully',
      data: accommodation
    });

  } catch (error) {
    logger.error(`Error updating accommodation ${req.params.id}: ${error.message}`);
    next(error);
  }
});

// DELETE /api/accommodations/:id - Soft delete accommodation (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    // Soft delete by setting isActive to false
    accommodation.isActive = false;
    await accommodation.save();

    res.json({
      success: true,
      message: 'Accommodation deleted successfully'
    });

  } catch (error) {
    logger.error(`Error deleting accommodation ${req.params.id}: ${error.message}`);
    next(error);
  }
});

// PATCH /api/accommodations/:id/activate - Reactivate accommodation (admin only)
router.patch('/:id/activate', protect, authorize('admin'), async (req, res, next) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: 'Accommodation not found'
      });
    }

    accommodation.isActive = true;
    await accommodation.save();

    res.json({
      success: true,
      message: 'Accommodation activated successfully',
      data: accommodation
    });

  } catch (error) {
    logger.error(`Error activating accommodation ${req.params.id}: ${error.message}`);
    next(error);
  }
});

// GET /api/accommodations/destination/:destinationId - Get accommodations by destination
router.get('/destination/:destinationId', async (req, res, next) => {
  try {
    const accommodations = await Accommodation.find({
      destination: req.params.destinationId,
      isActive: true
    }).populate('destination', 'name slug');

    res.json({
      success: true,
      count: accommodations.length,
      data: accommodations
    });

  } catch (error) {
    logger.error(`Error fetching accommodations for destination ${req.params.destinationId}: ${error.message}`);
    next(error);
  }
});

export default router;