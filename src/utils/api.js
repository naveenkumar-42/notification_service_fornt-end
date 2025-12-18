import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/notifications';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
});

export const notificationAPI = {
  sendNotification: (data) => api.post('/send', data),
  getStatus: (eventId) => api.get(`/status/${eventId}`),
  getHistory: () => api.get('/history'),
  getByStatus: (status) => api.get(`/status-filter/${status}`),
  healthCheck: () => api.get('/health'),
};

export default api;
