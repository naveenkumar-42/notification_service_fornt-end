
import React from 'react';
import { Loader } from 'lucide-react';
import './RecentNotifications.css';

function RecentNotifications({ notifications, loading }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'SENT': return 'success';
      case 'FAILED': return 'danger';
      case 'PENDING': return 'warning';
      default: return 'info';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
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
              {new Date(notif.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentNotifications;