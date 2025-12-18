
import React from 'react';
import { ChevronLeft, ChevronRight, Loader, Mail, MessageSquare, Bell, Smartphone, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import './NotificationTable.css';

function NotificationTable({ 
  notifications, 
  loading, 
  currentPage, 
  totalPages, 
  onPageChange,
  totalRecords 
}) {
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

  const getChannelIcon = (channel) => {
    switch(channel) {
      case 'EMAIL': return <Mail size={14} />;
      case 'SMS': return <MessageSquare size={14} />;
      case 'PUSH': return <Bell size={14} />;
      case 'IN_APP': return <Smartphone size={14} />;
      default: return <Mail size={14} />;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'SENT': return <CheckCircle2 size={14} />;
      case 'FAILED': return <XCircle size={14} />;
      case 'PENDING': return <Clock size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
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
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notif) => (
            <tr key={notif.id} className="table-row">
              <td className="cell-id">#{notif.id}</td>
              <td className="cell-type">
                <span className="type-badge">{notif.notificationType || '-'}</span>
              </td>
              <td>
                <span className="badge badge-primary channel-badge">
                  {getChannelIcon(notif.channel)}
                  <span>{notif.channel || '-'}</span>
                </span>
              </td>
              <td>
                <span className={`priority-badge priority-${notif.priority?.toLowerCase() || 'low'}`}>
                  {notif.priority || '-'}
                </span>
              </td>
              <td className="cell-recipient">{notif.recipient || '-'}</td>
              <td>
                <span className={`badge badge-${getStatusColor(notif.status)} status-badge`}>
                  {getStatusIcon(notif.status)}
                  <span>{notif.status}</span>
                </span>
              </td>
              <td className="cell-center">
                <span className="retry-badge">{notif.retryCount || 0}</span>
              </td>
              <td className="cell-date">
                <div className="date-cell">
                  <Clock size={12} />
                  <span className="date-relative">{formatDate(notif.createdAt)}</span>
                  <span className="date-full">{new Date(notif.createdAt).toLocaleString()}</span>
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