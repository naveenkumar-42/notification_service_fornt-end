import React from 'react';
import {
  ChevronLeft, ChevronRight, Loader,
  Mail, MessageSquare, Bell, Smartphone,
  Clock, CheckCircle2, CheckCheck, XCircle,
  Loader2, AlertCircle
} from 'lucide-react';
import './NotificationTable.css';

function NotificationTable({
  notifications,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  totalRecords,
  dateFormat = 'relative'
}) {

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'QUEUED': return <Loader2 size={14} className="animate-spin" />;
      case 'SENT': return <CheckCircle2 size={14} />;
      case 'DELIVERED': return <CheckCheck size={14} />;
      case 'PENDING': return <Clock size={14} />;
      case 'FAILED': return <XCircle size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel?.toUpperCase()) {
      case 'EMAIL': return <Mail size={14} />;
      case 'SMS': return <MessageSquare size={14} />;
      case 'PUSH': return <Bell size={14} />;
      case 'INAPP':
      case 'IN_APP': return <Smartphone size={14} />;
      default: return <Mail size={14} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';

    if (dateFormat === 'utc') {
      return date.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    }

    if (dateFormat === 'local') {
      return date.toLocaleString();
    }

    // Default to relative
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  if (loading) {
    return (
      <div className="table-loading">
        <Loader className="spinner" size={40} />
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="table-empty">
        <p>No notifications found</p>
        <small>Try adjusting your filters or search criteria</small>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Channel</th>
            <th>Priority</th>
            <th>Recipient</th>
            <th>Status</th>
            <th>Retries</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notif) => (
            <tr key={notif.id} className="table-row">
              <td className="cell-id">#{notif.id}</td>
              <td className="cell-type">
                <span className="type-badge">
                  {notif.notificationType || 'GENERAL'}
                </span>
              </td>

              {/* ✅ PERFECT CHANNEL BADGE */}
              <td className="channel-cell">
                <div className={`channel-badge channel-${notif.channel?.toLowerCase() || 'unknown'}`}>
                  <div className="channel-icon">
                    {getChannelIcon(notif.channel)}
                  </div>
                  <span>{notif.channel || '-'}</span>
                </div>
              </td>

              {/* ✅ PERFECT PRIORITY BADGE */}
              <td className="priority-cell">
                <div className={`priority-badge priority-${notif.priority?.toLowerCase() || 'medium'}`}>
                  <div className={`priority-dot priority-${notif.priority?.toLowerCase() || 'medium'}`}></div>
                  <span>{notif.priority || 'MEDIUM'}</span>
                </div>
              </td>

              <td className="cell-recipient">{notif.recipient || '-'}</td>

              {/* ✅ PERFECT STATUS BADGE */}
              <td className="status-cell">
                <div className={`status-badge status-${notif.status?.toLowerCase() || 'unknown'}`}>
                  <div className="status-icon">
                    {getStatusIcon(notif.status)}
                  </div>
                  <span>{notif.status || 'UNKNOWN'}</span>
                </div>
              </td>

              <td className="cell-center">
                <span className="retry-badge">{notif.retryCount || 0}</span>
              </td>

              <td className="cell-date">
                <div className="date-cell">
                  <Clock size={12} />
                  <span className="date-relative" title={new Date(notif.createdAt).toLocaleString()}>
                    {formatDate(notif.createdAt)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <div className="footer-info">
          Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, totalRecords)} of {totalRecords} notifications
        </div>

        <div className="pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`page-num ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationTable;
