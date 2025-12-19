import axios from 'axios';

// Use proxy in development, absolute URL in production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:8080/api/notifications'
  : '/api/notifications';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens or headers here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          console.error('Bad Request:', data.message || 'Invalid request');
          break;
        case 401:
          console.error('Unauthorized: Please check your credentials');
          break;
        case 403:
          console.error('Forbidden: You do not have permission');
          break;
        case 404:
          console.error('Not Found: The requested resource was not found');
          break;
        case 500:
          console.error('Server Error: Internal server error occurred');
          break;
        default:
          console.error(`Error ${status}:`, data.message || 'An error occurred');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error: Unable to connect to the server. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const notificationAPI = {
  // Send a notification
  sendNotification: (data) => api.post('/send', data),
  
  // Get notification status by event ID
  getStatus: (eventId) => api.get(`/status/${eventId}`),
  
  // Get all notification history
  getHistory: () => api.get('/history'),
  
  // Get notifications filtered by status
  getByStatus: (status) => api.get(`/status-filter/${status}`),
  
  // Health check endpoint
  healthCheck: () => api.get('/health'),


  getFilteredHistory: (params) => api.get('/filter', { params }),

  getByPriority: (priority) => api.get(`/priority-filter/${priority}`),

  getByChannel: (channel) => api.get(`/channel-filter/${channel}`)

};

export default api;
