
import React, { useState, useEffect } from 'react';
import { BarChart, TrendingUp, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { notificationAPI } from '../utils/api';
import StatsCard from '../components/Cards/StatsCard';
import RecentNotifications from '../components/Dashboard/RecentNotifications';
import QuickSendForm from '../components/Dashboard/SendForm/QuickSendForm';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { settings } = useSettings();
  const { canSend } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    delivered: 0,
    queued: 0,
    failed: 0
  });
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    // Use the configured interval (convert seconds to ms), default to 10s if invalid
    const intervalTime = (settings.autoRefreshInterval || 10) * 1000;
    const interval = setInterval(fetchDashboardData, intervalTime);
    return () => clearInterval(interval);
  }, [settings.autoRefreshInterval]);

  const fetchDashboardData = async () => {
    try {
      const response = await notificationAPI.getHistory();
      const notifications = response.data || [];

      setStats({
        total: notifications.length,
        delivered: notifications.filter(n => n.status === 'SENT' || n.status === 'DELIVERED').length,
        queued: notifications.filter(n => n.status === 'PENDING' || n.status === 'QUEUED').length,
        failed: notifications.filter(n => n.status === 'FAILED').length
      });

      // Sort by ID descending (newest first)
      const sortedNotifications = [...notifications].sort((a, b) => {
        if (typeof a.id === 'number' && typeof b.id === 'number') {
          return b.id - a.id;
        }
        return String(b.id).localeCompare(String(a.id));
      });

      setRecentNotifications(sortedNotifications.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
      const errorMessage = error.response?.data?.message || 'Failed to load dashboard data. Please check your connection.';
      setAlert({ type: 'error', message: errorMessage });
      setLoading(false);
    }
  };

  const handleQuickSend = async (formData) => {
    try {
      // Ensure all required fields are present
      const notificationData = {
        notificationType: formData.notificationType || 'ALERT',
        recipient: formData.recipient,
        channel: formData.channel || 'EMAIL',
        priority: formData.priority || 'CRITICAL',
        message: formData.message,
        subject: formData.subject || '',
        scheduledTime: formData.scheduledTime || ''
      };

      const response = await notificationAPI.sendNotification(notificationData);
      setAlert({
        type: 'success',
        message: `Notification sent successfully!${response.data?.eventId ? ` Event ID: ${response.data.eventId}` : ''}`
      });
      // Refresh dashboard data to show the new notification
      await fetchDashboardData();
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send notification. Please try again.';
      setAlert({ type: 'error', message: errorMessage });
      // Re-throw error so QuickSendForm can handle it
      throw new Error(errorMessage);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's an overview of your notifications.</p>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <div className="alert-content">
            {alert.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      {settings.enableAnalytics && (
        <div className="grid-4 mb-6">
          <StatsCard
            title="Total Notifications"
            value={stats.total}
            icon={BarChart}
            color="primary"
          />
          <StatsCard
            title="Delivered"
            value={stats.delivered}
            icon={CheckCircle}
            color="success"
          />
          <StatsCard
            title="Queued"
            value={stats.queued}
            icon={TrendingUp}
            color="warning"
          />
          <StatsCard
            title="Failed"
            value={stats.failed}
            icon={AlertCircle}
            color="danger"
          />
        </div>
      )}

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <h2>Quick Send</h2>
              {/* {!canSend && (
                <span className="text-xs text-red-500 flex items-center gap-1" style={{ fontSize: '0.8rem', color: '#ff1744', marginLeft: 'auto' }}>
                  <Lock size={14} /> Read Only
                </span>
              )} */}
            </div>
          </div>
          <div className="card-body">
            <QuickSendForm onSubmit={handleQuickSend} isReadOnly={!canSend} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Recent Notifications</h2>
          </div>
          <div className="card-body">
            <RecentNotifications notifications={recentNotifications} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;