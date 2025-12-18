import React from 'react';
import './StatsCard.css';

function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-icon">
        {Icon && <Icon size={32} />}
      </div>
      <div className="stats-content">
        <p className="stats-label">{title}</p>
        <p className="stats-value">{value.toLocaleString()}</p>
      </div>
      <div className="stats-bg-icon">
        {Icon && <Icon size={80} />}
      </div>
    </div>
  );
}

export default StatsCard;