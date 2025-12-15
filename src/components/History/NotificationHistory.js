import React, { useState, useEffect } from 'react';
import './NotificationHistory.css';

const NotificationHistory = ({ notifications, onFilterChange, loading }) => {
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('date');
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);

  useEffect(() => {
    let filtered = notifications;

    if (selectedStatus !== 'ALL') {
      filtered = filtered.filter((notif) => notif.status === selectedStatus);
    }

    // Sort
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'status') {
      filtered.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFilteredNotifications(filtered);
  }, [notifications, selectedStatus, sortBy]);

const handleStatusFilter = (status) => {
  setSelectedStatus(status);
  if (status === 'ALL') {
    // Reload all notifications when switching back to ALL
    if (onFilterChange) {
      onFilterChange('ALL');
    }
  } else if (onFilterChange) {
    onFilterChange(status);
  }
};


  const getStatusBadgeClass = (status) => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="notification-history">
      <h2>📋 Notification History</h2>

      <div className="filters">
        <div className="filter-buttons">
          {['ALL', 'SENT', 'PENDING', 'FAILED', 'RETRY'].map((status) => (
            <button
              key={status}
              className={`filter-btn ${selectedStatus === status ? 'active' : ''}`}
              onClick={() => handleStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="sort-options">
          <label htmlFor="sortBy">Sort by:</label>
          <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date (Newest First)</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">⏳ Loading...</div>
      ) : filteredNotifications.length === 0 ? (
        <div className="empty-state">
          <p>📭 No notifications found</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="notifications-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Recipient</th>
                <th>Channel</th>
                <th>Status</th>
                <th>Message</th>
                <th>Created At</th>
                <th>Retries</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.map((notif) => (
                <tr key={notif.id} className="notification-row">
                  <td className="id-cell">#{notif.id}</td>
                  <td className="recipient-cell">{notif.recipient}</td>
                  <td className="channel-cell">
                    <span className="channel-badge">{notif.channel}</span>
                  </td>
                  <td className="status-cell">
                    <span className={getStatusBadgeClass(notif.status)}>
                      {notif.status}
                    </span>
                  </td>
                  <td className="message-cell" title={notif.message}>
                    {notif.message.substring(0, 50)}
                    {notif.message.length > 50 ? '...' : ''}
                  </td>
                  <td className="date-cell">{formatDate(notif.createdAt)}</td>
                  <td className="retry-cell">{notif.retryCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NotificationHistory;
