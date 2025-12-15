import React, { useEffect } from 'react';
import { useNotification } from './hooks/useNotifications';
import NotificationForm from './components/Form/NotificationForm';
import NotificationHistory from './components/History/NotificationHistory';
import NotificationChart from './components/Charts/NotificationChart';
import './App.css';

function App() {
  const {
    notifications,
    loading,
    error,
    success,
    sendNotification,
    fetchHistory,
    fetchByStatus,
    clearMessages,
  } = useNotification();

  useEffect(() => {
    // Fetch history on component mount
    fetchHistory();
  }, [fetchHistory]);

  const handleSendNotification = async (data) => {
    try {
      await sendNotification(data);
      // Refresh history after sending
      setTimeout(() => fetchHistory(), 1000);
    } catch (err) {
      console.error('Error:', err);
    }
  };

const handleFilterChange = (status) => {
  if (status === 'ALL') {
    fetchHistory(); // Reload all notifications
  } else {
    fetchByStatus(status);
  }
};


  return (
    <div className="app">
      <header className="app-header">
        <h1>🔔 Notification Management System</h1>
        <p>Manage and track notifications in real-time</p>
      </header>

      {error && (
        <div className="alert alert-error">
          ❌ {error}
          <button className="close-btn" onClick={clearMessages}>
            ✕
          </button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          ✅ {success}
          <button className="close-btn" onClick={clearMessages}>
            ✕
          </button>
        </div>
      )}

      <main className="app-main">
        <div className="container">
          <div className="left-panel">
            <NotificationForm onSubmit={handleSendNotification} loading={loading} />
          </div>

          <div className="right-panel">
            <NotificationChart notifications={notifications} />
          </div>
        </div>

        <NotificationHistory
          notifications={notifications}
          onFilterChange={handleFilterChange}
          loading={loading}
        />
      </main>

      <footer className="app-footer">
        <p>© 2025 Notification System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
