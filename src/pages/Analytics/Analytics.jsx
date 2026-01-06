import React, { useState, useEffect, useCallback } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { notificationAPI } from '../../utils/api';
import './Analytics.css';

function Analytics() {
  const [notifications, setNotifications] = useState([]);
  const [chartData, setChartData] = useState({
    statusDistribution: [],
    priorityDistribution: [],
    channelDistribution: [],
    dailyTrend: [],
    retryAnalysis: []
  });

  const fetchAnalyticsData = useCallback(async () => {
    try {
      const response = await notificationAPI.getHistory();
      const data = response.data || [];
      setNotifications(data);
      processAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics data', error);
      setNotifications([]);
      processAnalytics([]);
    }
  }, []);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  const processAnalytics = (data) => {
    // If no data, set default zero values
    if (!data || data.length === 0) {
      setChartData({
        statusDistribution: [{ name: 'No Data', value: 0 }],
        priorityDistribution: [{ name: 'No Data', value: 0 }],
        channelDistribution: [{ name: 'No Data', value: 0 }],
        dailyTrend: [],
        retryAnalysis: [
          { name: '0 Retries', value: 0 },
          { name: '1-2 Retries', value: 0 },
          { name: '3-5 Retries', value: 0 },
          { name: '5+ Retries', value: 0 }
        ]
      });
      return;
    }

    // Status Distribution
    const statusCount = data.reduce((acc, n) => {
      let statusName = n.status || 'UNKNOWN';
      if (statusName === 'SENT' || statusName === 'DELIVERED') statusName = 'Delivered';
      if (statusName === 'PENDING' || statusName === 'QUEUED') statusName = 'Queued';
      if (statusName === 'DEAD_LETTERED') statusName = 'FAILED';

      const existing = acc.find((s) => s.name === statusName);
      if (existing) existing.value++;
      else acc.push({ name: statusName, value: 1 });
      return acc;
    }, []);

    // Priority Distribution
    const priorityCount = data.reduce((acc, n) => {
      const key = n.priority || 'UNKNOWN';
      const existing = acc.find((p) => p.name === key);
      if (existing) existing.value++;
      else acc.push({ name: key, value: 1 });
      return acc;
    }, []);

    // Channel Distribution
    const channelCount = data.reduce((acc, n) => {
      const key = n.channel || 'UNKNOWN';
      const existing = acc.find((c) => c.name === key);
      if (existing) existing.value++;
      else acc.push({ name: key, value: 1 });
      return acc;
    }, []);

    // Daily Trend (last 7 days)
    const dailyData = {};
    data.forEach((n) => {
      const date = new Date(n.createdAt).toLocaleDateString();
      if (!dailyData[date]) dailyData[date] = { date, count: 0, delivered: 0, failed: 0 };
      dailyData[date].count++;
      if (n.status === 'SENT' || n.status === 'DELIVERED') dailyData[date].delivered++;
      if (n.status === 'FAILED' || n.status === 'DEAD_LETTERED') dailyData[date].failed++;
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

    data.forEach((n) => {
      const retries = n.retryCount || 0;
      if (retries === 0) retryBuckets['0 Retries']++;
      else if (retries <= 2) retryBuckets['1-2 Retries']++;
      else if (retries <= 5) retryBuckets['3-5 Retries']++;
      else retryBuckets['5+ Retries']++;
    });

    const retryAnalysis = Object.entries(retryBuckets).map(([name, value]) => ({
      name,
      value
    }));

    setChartData({
      statusDistribution: statusCount,
      priorityDistribution: priorityCount,
      channelDistribution: channelCount,
      dailyTrend,
      retryAnalysis
    });
  };

  // Color system
  const COLORS = {
    critical: '#ff1744', // neon red
    high: '#ff9100', // neon orange / light red
    medium: '#2979ff', // neon blue
    low: '#00e676', // neon green
    unknown: '#9ca3af'
  };

  const STATUS_COLORS = {
    Delivered: COLORS.medium, // Was SENT
    DELIVERED: COLORS.low,
    FAILED: COLORS.critical,
    DEAD_LETTERED: COLORS.critical,
    RETRY: COLORS.high,
    Queued: COLORS.high, // Was PENDING
    PENDING: COLORS.high,
    QUEUED: COLORS.medium,
    DEFAULT: COLORS.unknown
  };

  const PRIORITY_COLORS = {
    CRITICAL: COLORS.critical,
    HIGH: COLORS.high,
    MEDIUM: COLORS.medium,
    LOW: COLORS.low,
    UNKNOWN: COLORS.unknown
  };

  const CHANNEL_COLORS = {
    EMAIL: '#60a5fa',
    SMS: '#34d399',
    PUSH: '#f97316',
    INAPP: '#a855f7',
    'IN_APP': '#a855f7',
    UNKNOWN: '#9ca3af'
  };

  const stats = {
    totalSent: notifications.filter((n) => n.status === 'SENT' || n.status === 'DELIVERED').length,
    totalFailed: notifications.filter((n) => n.status === 'FAILED').length,
    successRate:
      notifications.length > 0
        ? (
          (notifications.filter((n) => n.status === 'SENT' || n.status === 'DELIVERED').length /
            notifications.length) *
          100
        ).toFixed(2)
        : 0,
    avgRetries:
      notifications.length > 0
        ? (
          notifications.reduce((sum, n) => sum + (n.retryCount || 0), 0) /
          notifications.length
        ).toFixed(2)
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
          <div className="stat-label">Total Delivered</div>
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
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={110}
                dataKey="value"
                isAnimationActive={true}
              >
                {chartData.statusDistribution.map((entry, index) => (
                  <Cell
                    key={`status-${index}`}
                    fill={STATUS_COLORS[entry.name] || STATUS_COLORS.DEFAULT}
                    stroke="rgba(15,23,42,0.8)"
                    strokeWidth={1}
                  />
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
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={110}
                dataKey="value"
                isAnimationActive={true}
              >
                {chartData.priorityDistribution.map((entry, index) => (
                  <Cell
                    key={`priority-${index}`}
                    fill={PRIORITY_COLORS[entry.name] || PRIORITY_COLORS.UNKNOWN}
                    stroke="rgba(15,23,42,0.8)"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card mb-6">
        <h3>Daily Trend (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.dailyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="delivered"
              fill={COLORS.low}
              name="Delivered"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
            />
            <Bar
              dataKey="failed"
              fill={COLORS.critical}
              name="Failed"
              radius={[4, 4, 0, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid-2 mb-6">
        <div className="chart-card">
          <h3>Retry Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.retryAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                name="Count"
                fill={COLORS.medium}
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
              >
                {chartData.retryAnalysis.map((entry, index) => (
                  <Cell
                    key={`RETRY-${index}`}
                    fill={
                      index === 0 ? COLORS.low :
                        index === 1 ? COLORS.medium :
                          index === 2 ? COLORS.high :
                            COLORS.critical
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Channel Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.channelDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                isAnimationActive={true}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.channelDistribution.map((entry, index) => (
                  <Cell
                    key={`channel-${index}`}
                    fill={CHANNEL_COLORS[entry.name] || CHANNEL_COLORS.UNKNOWN}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
