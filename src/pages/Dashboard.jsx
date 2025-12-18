
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import StatsCard from '../components/Cards/StatsCard';
import RecentNotifications from '../components/Dashboard/RecentNotifications';
import QuickSendForm from '../components/Dashboard/SendForm/QuickSendForm';
import './Dashboard.css';

const API_URL = 'http://localhost:8080/api/notifications';

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    sent: 0,
    pending: 0,
    failed: 0
  });
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API_URL}/history`);
      const notifications = response.data;
      
      setStats({
        total: notifications.length,
        sent: notifications.filter(n => n.status === 'SENT').length,
        pending: notifications.filter(n => n.status === 'PENDING').length,
        failed: notifications.filter(n => n.status === 'FAILED').length
      });
      
      setRecentNotifications(notifications.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
      setAlert({ type: 'error', message: 'Failed to load dashboard data' });
      setLoading(false);
    }
  };

  const handleQuickSend = async (formData) => {
    try {
      await axios.post(`${API_URL}/send`, formData);
      setAlert({ type: 'success', message: 'Notification sent successfully!' });
      fetchDashboardData();
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to send notification' });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's an overview of your notifications.</p>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <div className="alert-content">
            {alert.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      <div className="grid-4 mb-6">
        <StatsCard
          title="Total Notifications"
          value={stats.total}
          icon={BarChart}
          color="primary"
        />
        <StatsCard
          title="Sent"
          value={stats.sent}
          icon={CheckCircle}
          color="success"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={TrendingUp}
          color="warning"
        />
        <StatsCard
          title="Failed"
          value={stats.failed}
          icon={AlertCircle}
          color="danger"
        />
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <h2>Quick Send</h2>
          </div>
          <div className="card-body">
            <QuickSendForm onSubmit={handleQuickSend} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Recent Notifications</h2>
          </div>
          <div className="card-body">
            <RecentNotifications notifications={recentNotifications} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;