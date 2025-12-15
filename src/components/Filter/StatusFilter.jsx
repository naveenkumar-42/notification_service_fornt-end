import React from 'react';
import './StatusFilter.css';

const StatusFilter = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { label: 'All', value: 'ALL', icon: '📊' },
    { label: 'Sent', value: 'SENT', icon: '✅' },
    { label: 'Pending', value: 'PENDING', icon: '⏳' },
    { label: 'Failed', value: 'FAILED', icon: '❌' }
  ];

  return (
    <div className="status-filter">
      <h3>Filter</h3>
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.value}
            className={`filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.value)}
          >
            <span className="filter-icon">{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
