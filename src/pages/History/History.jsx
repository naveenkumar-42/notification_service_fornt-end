
import React, { useState, useEffect } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { notificationAPI } from '../../utils/api';
import FilterSidebar from '../../components/History/FilterSidebar';
import NotificationTable from '../../components/History/NotificationTable/NotificationTable';
import './History.css';

function History() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  
  const [filters, setFilters] = useState({
    status: 'ALL',
    priority: 'ALL',
    channel: 'ALL',
    type: 'ALL',
    dateRange: 'all'
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10
  });

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [notifications, filters, searchTerm]);

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getHistory();
      setNotifications(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
      setNotifications([]);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...notifications];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(notif =>
        notif.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notif.id?.toString().includes(searchTerm) ||
        notif.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'ALL') {
      filtered = filtered.filter(n => n.status === filters.status);
    }

    // Priority filter
    if (filters.priority !== 'ALL') {
      filtered = filtered.filter(n => n.priority === filters.priority);
    }

    // Channel filter
    if (filters.channel !== 'ALL') {
      filtered = filtered.filter(n => n.channel === filters.channel);
    }

    // Type filter
    if (filters.type !== 'ALL') {
      filtered = filtered.filter(n => n.notificationType === filters.type);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const startDate = new Date();

      switch(filters.dateRange) {
        case '24h':
          startDate.setDate(now.getDate() - 1);
          break;
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
        default:
          break;
      }

      filtered = filtered.filter(n => new Date(n.createdAt) >= startDate);
    }

    setFilteredNotifications(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Type', 'Channel', 'Priority', 'Recipient', 'Status', 'Retries', 'Created At'],
      ...filteredNotifications.map(n => [
        n.id,
        n.notificationType,
        n.channel,
        n.priority,
        n.recipient,
        n.status,
        n.retryCount,
        new Date(n.createdAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notifications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const totalPages = Math.ceil(filteredNotifications.length / pagination.itemsPerPage);
  const startIdx = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIdx = startIdx + pagination.itemsPerPage;
  const paginatedData = filteredNotifications.slice(startIdx, endIdx);

  return (
    <div className="history-container">
      <div className="page-header flex-between">
        <div>
          <h1>Notification History</h1>
          <p>View and manage all your sent notifications</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={18} />
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="history-content">
        {showFilters && (
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            notificationCount={filteredNotifications.length}
          />
        )}

        <div className="history-main">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by recipient, ID, or message..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPagination({ ...pagination, currentPage: 1 });
              }}
            />
          </div>

          <NotificationTable
            notifications={paginatedData}
            loading={loading}
            currentPage={pagination.currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setPagination({ ...pagination, currentPage: page })}
            totalRecords={filteredNotifications.length}
          />
        </div>
      </div>
    </div>
  );
}

export default History;