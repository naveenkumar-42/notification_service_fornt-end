import React from 'react';
import './NotificationCard.css';

const NotificationCard = ({ notification }) => {
  const getStatusBadge = (status) => {
    const badges = {
      SENT: 'badge-success',
      PENDING: 'badge-pending',
      FAILED: 'badge-failed'
    };
    return badges[status] || 'badge-pending';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`notification-card status-${notification.status.toLowerCase()}`}>
      <div className="card-header">
        <span className={`badge ${getStatusBadge(notification.status)}`}>
          {notification.status}
        </span>
        <span className="card-id">#{notification.id}</span>
      </div>

      <div className="card-content">
        <div className="info-item">
          <span className="info-label">📧 Recipient:</span>
          <span className="info-value">{notification.recipient}</span>
        </div>

        <div className="info-item">
          <span className="info-label">📡 Channel:</span>
          <span className="info-value">{notification.channel}</span>
        </div>

        <div className="info-item">
          <span className="info-label">💬 Message:</span>
          <p className="info-message">{notification.message}</p>
        </div>

        <div className="info-row">
          <div className="info-item">
            <span className="info-label">🔄 Retries:</span>
            <span className="info-value">{notification.retryCount}/3</span>
          </div>

          <div className="info-item">
            <span className="info-label">⏰ Sent:</span>
            <span className="info-value">{formatDate(notification.createdAt)}</span>
          </div>
        </div>

        {notification.failureReason && (
          <div className="error-alert">
            <span>⚠️ {notification.failureReason}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
