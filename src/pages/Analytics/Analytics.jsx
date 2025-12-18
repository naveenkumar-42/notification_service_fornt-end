
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Analytics.css';

const API_URL = 'http://localhost:8080/api/notifications';

function Analytics() {
  const [notifications, setNotifications] = useState([]);
  const [chartData, setChartData] = useState({
    statusDistribution: [],
    priorityDistribution: [],
    channelDistribution: [],
    dailyTrend: [],
    retryAnalysis: []
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/history`);
      const data = response.data;
      setNotifications(data);
      processAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics data', error);
    }
  };

  const processAnalytics = (data) => {
    // Status Distribution
    const statusCount = data.reduce((acc, n) => {
      const existing = acc.find(s => s.name === n.status);
      if (existing) existing.value++;
      else acc.push({ name: n.status, value: 1 });
      return acc;
    }, []);

    // Priority Distribution
    const priorityCount = data.reduce((acc, n) => {
      const existing = acc.find(p => p.name === n.priority);
      if (existing) existing.value++;
      else acc.push({ name: n.priority || 'UNKNOWN', value: 1 });
      return acc;
    }, []);

    // Channel Distribution
    const channelCount = data.reduce((acc, n) => {
      const existing = acc.find(c => c.name === n.channel);
      if (existing) existing.value++;
      else acc.push({ name: n.channel, value: 1 });
      return acc;
    }, []);

    // Daily Trend (last 7 days)
    const dailyData = {};
    data.forEach(n => {
      const date = new Date(n.createdAt).toLocaleDateString();
      if (!dailyData[date]) dailyData[date] = { date, count: 0, sent: 0, failed: 0 };
      dailyData[date].count++;
      if (n.status === 'SENT') dailyData[date].sent++;
      if (n.status === 'FAILED') dailyData[date].failed++;
    });

    const dailyTrend = Object.values(dailyData)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-7);

    // Retry Analysis
    const retryBuckets = {
      '0 Retries': 0,
      '1-2 Retries': 0,
      '3-5 Retries': 0,
      '5+ Retries': 0
    };

    data.forEach(n => {
      const retries = n.retryCount || 0;
      if (retries === 0) retryBuckets['0 Retries']++;
      else if (retries <= 2) retryBuckets['1-2 Retries']++;
      else if (retries <= 5) retryBuckets['3-5 Retries']++;
      else retryBuckets['5+ Retries']++;
    });

    const retryAnalysis = Object.entries(retryBuckets).map(([name, value]) => ({ name, value }));

    setChartData({
      statusDistribution: statusCount,
      priorityDistribution: priorityCount,
      channelDistribution: channelCount,
      dailyTrend,
      retryAnalysis
    });
  };

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const stats = {
    totalSent: notifications.filter(n => n.status === 'SENT').length,
    totalFailed: notifications.filter(n => n.status === 'FAILED').length,
    successRate: notifications.length > 0 
      ? ((notifications.filter(n => n.status === 'SENT').length / notifications.length) * 100).toFixed(2)
      : 0,
    avgRetries: notifications.length > 0
      ? (notifications.reduce((sum, n) => sum + (n.retryCount || 0), 0) / notifications.length).toFixed(2)
      : 0
  };

  return (
    <div className="analytics-container">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Comprehensive notifications analytics and insights</p>
      </div>

      <div className="grid-4 mb-6">
        <div className="stat-card">
          <div className="stat-label">Total Sent</div>
          <div className="stat-value">{stats.totalSent}</div>
          <div className="stat-change positive">Success</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Failed</div>
          <div className="stat-value">{stats.totalFailed}</div>
          <div className="stat-change negative">Failed</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Success Rate</div>
          <div className="stat-value">{stats.successRate}%</div>
          <div className="stat-change positive">Of all notifications</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Retries</div>
          <div className="stat-value">{stats.avgRetries}</div>
          <div className="stat-change">Per notification</div>
        </div>
      </div>

      <div className="grid-2 mb-6">
        <div className="chart-card">
          <h3>Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, value}) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.priorityDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, value}) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.priorityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2 mb-6">
        <div className="chart-card">
          <h3>Daily Trend (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sent" fill="#10b981" name="Sent" />
              <Bar dataKey="failed" fill="#ef4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Retry Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.retryAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <h3>Channel Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.channelDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8b5cf6" name="Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;