import React from 'react';
import './Header.css';

const Header = ({ totalNotifications, sentNotifications, failedNotifications }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-title">
            <h1>📬 Notification Hub</h1>
            <p>Manage and track notifications in real-time</p>
          </div>

          <div className="header-stats">
            <div className="stat-item">
              <div className="stat-number">{totalNotifications}</div>
              <div className="stat-label">Total Sent</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" style={{ color: 'var(--accent)' }}>
                {sentNotifications}
              </div>
              <div className="stat-label">Successful</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" style={{ color: '#ff5757' }}>
                {failedNotifications}
              </div>
              <div className="stat-label">Failed</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
