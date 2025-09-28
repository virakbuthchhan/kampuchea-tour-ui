import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// Add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Accept-Language'] = localStorage.getItem('i18nextLng') || 'kh';
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration / 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optionally redirect to login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const apiVersion = 'v1.0.0';
export const apiPath = {
  github: '/auth/github/redirect',
  google: '/auth/google/redirect',
  login: apiVersion+'/auth/login',
  verifyOtp: apiVersion+'/verify-otp',
  logout: apiVersion+'/auth/logout',
  register: apiVersion+'/auth/register',
  requestReset: apiVersion+'/auth/request-reset',
  me: apiVersion+'/auth/me',
  uniqueCheck: apiVersion+'/validation/unique-check',
  tokenCheck: apiVersion+'/validation/token-check',
  broadcaster: apiVersion+'/broadcasting/auth',
}
export default api;
