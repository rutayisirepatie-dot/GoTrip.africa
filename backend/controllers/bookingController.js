import Booking from '../models/Booking.js';
import logger from '../utils/logger.js';

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('accommodation', 'name');
    res.json({ success: true, data: bookings });
  } catch (error) {
    logger.error(`Error fetching bookings: ${error.message}`);
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('accommodation', 'name');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    logger.error(`Error fetching booking by ID: ${error.message}`);
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    logger.error(`Error creating booking: ${error.message}`);
    next(error);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    logger.error(`Error updating booking: ${error.message}`);
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting booking: ${error.message}`);
    next(error);
  }
};

export const getBookingStats = async (req, res, next) => {
  try {
    const total = await Booking.countDocuments();
    const upcoming = await Booking.countDocuments({ date: { $gte: new Date() } });
    res.json({ success: true, data: { total, upcoming } });
  } catch (error) {
    logger.error(`Error fetching booking stats: ${error.message}`);
    next(error);
  }
};