import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { notificationAPI } from '../../utils/api';
import FilterSidebar from '../../components/History/FilterSidebar';
import NotificationTable from '../../components/History/NotificationTable/NotificationTable';
import './History.css';

function History() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  
  const [filters, setFilters] = useState({
    status: 'ALL',
    priority: 'ALL',
    channel: 'ALL',
    dateRange: 'all'  // Removed 'type' - using notificationType from backend
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 12
  });

  // ✅ FIXED: Fetch data based on filters (SERVER-SIDE)
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      
      // Build backend filter params
      const params = {
        status: filters.status === 'ALL' ? null : filters.status,
        priority: filters.priority === 'ALL' ? null : filters.priority,
        channel: filters.channel === 'ALL' ? null : filters.channel,
        dateRange: filters.dateRange === 'all' ? null : filters.dateRange
      };

      const response = await notificationAPI.getFilteredHistory(params);
      setNotifications(response.data || []);
      
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.priority, filters.channel, filters.dateRange]);

  // ✅ Auto-refresh every 15s
  useEffect(() => {
    fetchNotifications();
    // const interval = setInterval(fetchNotifications, 15000);
    // return () => clearInterval(interval);
  }, [fetchNotifications]);

  // ✅ Client-side search (on already filtered data)
  const filteredNotifications = notifications.filter(notif =>
    !searchTerm || 
    notif.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notif.id?.toString().includes(searchTerm) ||
    notif.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Type', 'Channel', 'Priority', 'Recipient', 'Status', 'Retries', 'Created', 'Updated'],
      ...filteredNotifications.map(n => [
        n.id,
        n.notificationType || 'GENERAL',
        n.channel,
        n.priority,
        n.recipient,
        n.status,
        n.retryCount || 0,
        new Date(n.createdAt).toLocaleString(),
        new Date(n.updatedAt).toLocaleString()
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notifications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // ✅ Pagination
  const totalPages = Math.ceil(filteredNotifications.length / pagination.itemsPerPage);
  const startIdx = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIdx = startIdx + pagination.itemsPerPage;
  const paginatedData = filteredNotifications.slice(startIdx, endIdx);

  return (
    <div className="history-container">
      <div className="page-header flex-between">
        <div>
          <h1>Notification History</h1>
          <p>{filteredNotifications.length} of {notifications.length} notifications 
            {filters.status !== 'ALL' || filters.priority !== 'ALL' || filters.channel !== 'ALL' || filters.dateRange !== 'all' 
              ? ' (filtered)' : ''
            }
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={18} />
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
          <button className="btn btn-secondary" onClick={handleExport} disabled={filteredNotifications.length === 0}>
            <Download size={18} />
            Export CSV ({filteredNotifications.length})
          </button>
        </div>
      </div>

      <div className="history-content">
        {showFilters && (
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            notificationCount={notifications.length}
          />
        )}

        <div className="history-main">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search recipients, IDs, messages..."
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
