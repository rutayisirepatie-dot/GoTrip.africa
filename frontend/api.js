import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // change if your backend URL is different

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // stored after login
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;