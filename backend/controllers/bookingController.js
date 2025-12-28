import Booking from '../models/bookingModel.js';
import logger from '../utils/logger.js';

export const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create({ 
      ...req.body, 
      user: req.user._id, 
      userName: req.user.name, 
      userEmail: req.user.email 
    });
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    logger.error(`Error creating booking: ${error.message}`);
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    logger.error(`Error fetching bookings: ${error.message}`);
    next(error);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    logger.error(`Error fetching user bookings: ${error.message}`);
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (error) {
    logger.error(`Error updating booking: ${error.message}`);
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
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