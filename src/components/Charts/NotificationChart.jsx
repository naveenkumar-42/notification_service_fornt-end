import React, { useMemo } from 'react';
import './NotificationChart.css';

const NotificationChart = ({ notifications }) => {
  const stats = useMemo(() => {
    const statsByStatus = {};
    const statsByChannel = {};

    notifications.forEach((notif) => {
      // Count by status
      statsByStatus[notif.status] = (statsByStatus[notif.status] || 0) + 1;
      // Count by channel
      statsByChannel[notif.channel] = (statsByChannel[notif.channel] || 0) + 1;
    });

    return { statsByStatus, statsByChannel };
  }, [notifications]);

  const getStatusColor = (status) => {
    const colors = {
      SENT: '#10b981',
      PENDING: '#f59e0b',
      FAILED: '#ef4444',
      RETRY: '#8b5cf6',
      DEAD_LETTERED: '#6b7280',
    };
    return colors[status] || '#6b7280';
  };

  const getChannelIcon = (channel) => {
    const icons = {
      EMAIL: '📧',
      SMS: '📱',
      PUSH: '🔔',
    };
    return icons[channel] || '📬';
  };

  const maxStatusCount = Math.max(
    Object.values(stats.statsByStatus).length > 0 ? Math.max(...Object.values(stats.statsByStatus)) : 1,
    1
  );

  const maxChannelCount = Math.max(
    Object.values(stats.statsByChannel).length > 0 ? Math.max(...Object.values(stats.statsByChannel)) : 1,
    1
  );

  return (
    <div className="notification-chart">
      <h2>📊 Statistics</h2>
      <div className="chart-container">
        <div className="chart-section">
          <h3>By Status</h3>
          <div className="bar-chart">
            {Object.entries(stats.statsByStatus).map(([status, count]) => (
              <div key={status} className="bar-item">
                <div className="bar-label">{status}</div>
                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{
                      width: `${(count / maxStatusCount) * 100}%`,
                      backgroundColor: getStatusColor(status),
                    }}
                  >
                    <span className="bar-value">{count}</span>
                  </div>
                </div>
              </div>
            ))}
            {Object.keys(stats.statsByStatus).length === 0 && (
              <p className="empty-message">No data available</p>
            )}
          </div>
        </div>

        <div className="chart-section">
          <h3>By Channel</h3>
          <div className="channel-stats">
            {Object.entries(stats.statsByChannel).map(([channel, count]) => (
              <div key={channel} className="channel-item">
                <div className="channel-icon">{getChannelIcon(channel)}</div>
                <div className="channel-info">
                  <div className="channel-name">{channel}</div>
                  <div className="channel-count">{count} notifications</div>
                </div>
              </div>
            ))}
            {Object.keys(stats.statsByChannel).length === 0 && (
              <p className="empty-message">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationChart;
