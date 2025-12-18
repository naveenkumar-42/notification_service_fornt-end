
import React from 'react';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
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
            <tr key={notif.id}>
              <td className="cell-id">#{notif.id}</td>
              <td>{notif.notificationType || '-'}</td>
              <td>
                <span className="badge badge-primary">
                  {notif.channel || '-'}
                </span>
              </td>
              <td>
                <span className={`priority-${notif.priority?.toLowerCase() || 'low'}`}>
                  {notif.priority || '-'}
                </span>
              </td>
              <td className="cell-recipient">{notif.recipient}</td>
              <td>
                <span className={`badge badge-${getStatusColor(notif.status)}`}>
                  {notif.status}
                </span>
              </td>
              <td className="cell-center">
                <span className="retry-badge">{notif.retryCount || 0}</span>
              </td>
              <td className="cell-date">
                {new Date(notif.createdAt).toLocaleString()}
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