
import React from 'react';
import { Loader } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import './RecentNotifications.css';

function RecentNotifications({ notifications, loading }) {
  const { settings } = useSettings();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';

    if (settings.dateFormat === 'utc') {
      return date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    }
    if (settings.dateFormat === 'local') {
      return date.toLocaleString();
    }
    // relative
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SENT': return 'success';
      case 'FAILED': return 'danger';
      case 'PENDING': return 'warning';
      default: return 'info';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'success';
      default: return 'info';
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <Loader className="spinner" size={32} />
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="empty-state">
        <p>No notifications yet</p>
        <small>Send your first notification to get started</small>
      </div>
    );
  }

  return (
    <div className="recent-list">
      {notifications.map((notif) => (
        <div key={notif.id} className="notification-item">
          <div className="notif-header">
            <span className="notif-id">#{notif.id}</span>
            <span className={`badge badge-${getStatusColor(notif.status)}`}>
              {notif.status}
            </span>
          </div>
          <p className="notif-message">{notif.message?.substring(0, 60)}...</p>
          <div className="notif-footer">
            <span className={`badge-outline badge-${getPriorityColor(notif.priority)}`}>
              {notif.priority}
            </span>
            <span className="notif-time">
              {formatDate(notif.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentNotifications;