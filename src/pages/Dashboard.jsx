import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header/Header';
import NotificationForm from '../components/Form/NotificationForm';
import NotificationCard from '../components/Cards/NotificationCard';
import StatsCard from '../components/Stats/StatsCard';
import StatusFilter from '../components/Filter/StatusFilter';
import AlertMessage from '../components/Alerts/AlertMessage';
import './Dashboard.css';

const API_URL = 'http://localhost:8080/api/notifications';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Fetch notifications
  const fetchNotifications = async (filter = statusFilter) => {
    try {
      let url = `${API_URL}/history`;
      if (filter !== 'ALL') {
        url = `${API_URL}/status-filter/${filter}`;
      }
      const response = await axios.get(url);
      setNotifications(response.data);
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to fetch notifications'
      });
    }
  };

  // Auto-refresh every 5 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => fetchNotifications(), 5000);
    return () => clearInterval(interval);
  }, [statusFilter]);

  // Handle form submission
  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/send`, formData);
      setAlert({
        type: 'success',
        message: `✓ Notification sent! Event ID: ${response.data.eventId}`
      });
      fetchNotifications();
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to send notification'
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'SENT').length,
    pending: notifications.filter(n => n.status === 'PENDING').length,
    failed: notifications.filter(n => n.status === 'FAILED').length
  };

  return (
    <div className="dashboard">
      <Header
        totalNotifications={stats.total}
        sentNotifications={stats.sent}
        failedNotifications={stats.failed}
      />

      <main className="dashboard-main">
        <div className="container">
          {/* Stats Section */}
          <div className="stats-grid">
            <StatsCard
              icon="📨"
              title="Total Notifications"
              value={stats.total}
              color="accent"
            />
            <StatsCard
              icon="✅"
              title="Sent Successfully"
              value={stats.sent}
              color="accent-2"
            />
            <StatsCard
              icon="⏳"
              title="Pending"
              value={stats.pending}
              color="accent"
            />
            <StatsCard
              icon="❌"
              title="Failed"
              value={stats.failed}
              color="accent"
            />
          </div>

          {/* Main Content */}
          <div className="dashboard-grid">
            {/* Left: Form */}
            <aside className="dashboard-sidebar">
              <NotificationForm onSubmit={handleSubmit} loading={loading} />
              <StatusFilter
                activeFilter={statusFilter}
                onFilterChange={(filter) => setStatusFilter(filter)}
              />
            </aside>

            {/* Right: Notifications List */}
            <section className="dashboard-content">
              <div className="notifications-header">
                <h2>Notification History</h2>
                <span className="notification-count">
                  {notifications.length} notifications
                </span>
              </div>

              {notifications.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <h3>No notifications yet</h3>
                  <p>Send your first notification to get started!</p>
                </div>
              ) : (
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
