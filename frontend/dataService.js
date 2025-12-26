import api from './api';

// Guides
export const getGuides = async () => {
  const res = await api.get('/guides');
  return res.data.data;
};

// Destinations
export const getDestinations = async () => {
  const res = await api.get('/destinations');
  return res.data.data;
};

// Translators
export const getTranslators = async () => {
  const res = await api.get('/translators');
  return res.data.data;
};

// Accommodations
export const getAccommodations = async () => {
  const res = await api.get('/accommodations');
  return res.data.data;
};
