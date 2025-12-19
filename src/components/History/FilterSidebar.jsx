
import React from 'react';
import './FilterSidebar.css';

function FilterSidebar({ filters, onFilterChange, notificationCount }) {
  const statusOptions = [
    { value: 'ALL', label: 'All Status', color: 'primary' },
    { value: 'SENT', label: 'Sent', color: 'success' },
    { value: 'PENDING', label: 'Pending', color: 'warning' },
    { value: 'FAILED', label: 'Failed', color: 'danger' }
  ];

  const priorityOptions = [
    { value: 'ALL', label: 'All Priorities' },
    { value:'CRITICAL', label:'Critical', color:'danger'},
    { value: 'HIGH', label: 'High', color: 'danger' },
    { value: 'MEDIUM', label: 'Medium', color: 'warning' },
    { value: 'LOW', label: 'Low', color: 'success' },

  ];

  const channelOptions = [
    { value: 'ALL', label: 'All Channels' },
    { value: 'EMAIL', label: 'Email' },
    { value: 'SMS', label: 'SMS' },
    { value: 'PUSH', label: 'Push' },
    { value: 'IN_APP', label: 'In-App' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <span className="filter-count">{notificationCount} Results</span>
      </div>

      <div className="filter-group">
        <label className="filter-label">Status</label>
        <div className="filter-options">
          {statusOptions.map(option => (
            <button
              key={option.value}
              className={`filter-option ${filters.status === option.value ? 'active' : ''}`}
              onClick={() => onFilterChange('status', option.value)}
            >
              <span className={`filter-dot badge-${option.color}`}></span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Priority</label>
        <div className="filter-options">
          {priorityOptions.map(option => (
            <button
              key={option.value}
              className={`filter-option ${filters.priority === option.value ? 'active' : ''}`}
              onClick={() => onFilterChange('priority', option.value)}
            >
              <span className={`filter-dot ${option.color ? 'badge-' + option.color : ''}`}></span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Channel</label>
        <div className="filter-options">
          {channelOptions.map(option => (
            <button
              key={option.value}
              className={`filter-option ${filters.channel === option.value ? 'active' : ''}`}
              onClick={() => onFilterChange('channel', option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Date Range</label>
        <div className="filter-options">
          {dateRangeOptions.map(option => (
            <button
              key={option.value}
              className={`filter-option ${filters.dateRange === option.value ? 'active' : ''}`}
              onClick={() => onFilterChange('dateRange', option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;