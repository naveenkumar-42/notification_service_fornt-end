import { useState, useCallback } from 'react';
import { notificationAPI } from '../utils/api';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Send notification
  const sendNotification = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await notificationAPI.sendNotification(data);
      setSuccess(`Notification sent! Event ID: ${response.data.eventId}`);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to send notification';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get notification status
  const getNotificationStatus = useCallback(async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationAPI.getStatus(eventId);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch status';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch notification history
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationAPI.getHistory();
      setNotifications(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch history';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get notifications by status
  const fetchByStatus = useCallback(async (status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await notificationAPI.getByStatus(status);
      setNotifications(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch notifications';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear messages
  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return {
    notifications,
    loading,
    error,
    success,
    sendNotification,
    getNotificationStatus,
    fetchHistory,
    fetchByStatus,
    clearMessages,
  };
};
