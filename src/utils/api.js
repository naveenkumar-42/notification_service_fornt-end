import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/notifications';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add CORS headers
api.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
});

export const notificationAPI = {
  // Send a new notification
  sendNotification: (data) => {
    return api.post('/send', data);
  },

  // Get notification by ID
  getStatus: (eventId) => {
    return api.get(`/status/${eventId}`);
  },

  // Get all notifications
  getHistory: () => {
    return api.get('/history');
  },

  // Get notifications by status
  getByStatus: (status) => {
    return api.get(`/status-filter/${status}`);
  },

  // Health check
  healthCheck: () => {
    return api.get('/health');
  },
};

export default api;
