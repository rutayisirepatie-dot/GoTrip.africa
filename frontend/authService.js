import api from './api';

export const register = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password });
  if (res.data.token) localStorage.setItem('token', res.data.token);
  return res.data;
};

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  if (res.data.token) localStorage.setItem('token', res.data.token);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const verifyUser = async () => {
  const res = await api.get('/auth/verify');
  return res.data;
};