// backend/controllers/tripPlanController.js
import TripPlan from '../models/TripPlan.js';
import { sendEmail, loadTemplate } from '../utils/emailService.js';
import logger from '../utils/logger.js';

// Create a new trip plan
export const createTripPlan = async (req, res) => {
  try {
    const {
      startDate,
      duration,
      travelers,
      budget,
      interests,
      message,
      userName,
      userEmail
    } = req.body;

    // --- Validate and parse fields ---
    const parsedDate = new Date(startDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid startDate format'
      });
    }

    if (!duration || !budget || !travelers) {
      return res.status(400).json({
        success: false,
        message: 'Duration, budget, and number of travelers are required'
      });
    }

    if (typeof travelers !== 'number' || travelers <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Travelers must be a positive number'
      });
    }

    // Create the trip plan
    const tripPlan = new TripPlan({
      startDate: parsedDate,
      duration,
      travelers,
      budget,
      interests: Array.isArray(interests) ? interests : [],
      message,
      userName,
      userEmail,
      user: req.user._id
    });

    await tripPlan.save();

    // Optional: send email notifications
    try {
      await sendTripPlanConfirmation(tripPlan);
      await sendTripPlanNotification(tripPlan);
    } catch (emailErr) {
      logger.error('Email sending failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Trip plan submitted successfully',
      tripPlan
    });

  } catch (error) {
    logger.error('Failed to submit trip plan:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to submit trip plan',
      error: error.message
    });
  }
};

// Update an existing trip plan
export const updateTripPlan = async (req, res) => {
  try {
    const { tripId } = req.params;
    const updateData = req.body;

    if (updateData.startDate) {
      const parsedDate = new Date(updateData.startDate);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid startDate format'
        });
      }
      updateData.startDate = parsedDate;
    }

    const updatedTrip = await TripPlan.findByIdAndUpdate(tripId, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedTrip) {
      return res.status(404).json({
        success: false,
        message: 'Trip plan not found'
      });
    }

    res.json({
      success: true,
      message: 'Trip plan updated successfully',
      tripPlan: updatedTrip
    });

  } catch (error) {
    logger.error('Failed to update trip plan:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update trip plan',
      error: error.message
    });
  }
};

// Delete a trip plan
export const deleteTripPlan = async (req, res) => {
  try {
    const { tripId } = req.params;

    const deletedTrip = await TripPlan.findByIdAndDelete(tripId);

    if (!deletedTrip) {
      return res.status(404).json({
        success: false,
        message: 'Trip plan not found'
      });
    }

    res.json({
      success: true,
      message: 'Trip plan deleted successfully'
    });

  } catch (error) {
    logger.error('Failed to delete trip plan:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete trip plan',
      error: error.message
    });
  }
};

// Send confirmation email
export const sendTripPlanConfirmation = async (trip) => {
  const html = await loadTemplate('tripConfirmation', { trip });
  return sendEmail({ to: trip.userEmail, subject: 'Trip Confirmation', html });
};

// Send notification to admin
export const sendTripPlanNotification = async (trip) => {
  const html = await loadTemplate('tripNotification', { trip });
  return sendEmail({ to: 'admin@example.com', subject: 'New Trip Plan', html });
};

export default {
  createTripPlan,
  updateTripPlan,
  deleteTripPlan,
  sendTripPlanConfirmation,
  sendTripPlanNotification
};