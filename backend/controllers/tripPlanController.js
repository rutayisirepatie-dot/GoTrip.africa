// backend/controllers/tripPlanController.js
import { sendEmail, loadTemplate } from '../utils/emailService.js';
import logger from '../utils/logger.js';

// --- Example Trip Plan Functions ---
export const createTripPlan = async (req, res) => { /* ... */ };
export const updateTripPlan = async (req, res) => { /* ... */ };
export const deleteTripPlan = async (req, res) => { /* ... */ };

// --- Email Functions ---
export const sendTripPlanConfirmation = async (trip) => {
  const html = await loadTemplate('tripConfirmation', { trip });
  return sendEmail({ to: trip.userEmail, subject: 'Trip Confirmation', html });
};

export const sendTripPlanNotification = async (trip) => {
  const html = await loadTemplate('tripNotification', { trip });
  return sendEmail({ to: 'admin@example.com', subject: 'New Trip Plan', html });
};

// --- Optional default export ---
export default {
  createTripPlan,
  updateTripPlan,
  deleteTripPlan,
  sendTripPlanConfirmation,
  sendTripPlanNotification
};