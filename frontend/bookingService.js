import api from './api';

// Create a new booking (user must be logged in)
export const createBooking = async (bookingData) => {
  const res = await api.post('/bookings', bookingData);
  return res.data.data;
};

// Get bookings for logged-in user
export const getUserBookings = async () => {
  const res = await api.get('/bookings/user');
  return res.data.data;
};

// Admin: get all bookings
export const getAllBookings = async () => {
  const res = await api.get('/bookings');
  return res.data.data;
};

// Admin: update booking status
export const updateBookingStatus = async (id, status) => {
  const res = await api.patch(`/bookings/${id}/status`, { status });
  return res.data.data;
};