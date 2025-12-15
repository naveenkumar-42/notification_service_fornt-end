import React from 'react';
import './StatsCard.css';

const StatsCard = ({ icon, title, value, trend, color = 'accent' }) => {
  return (
    <div className="stats-card glass">
      <div className="stats-icon" style={{ color: `var(--${color})` }}>
        {icon}
      </div>
      <div className="stats-info">
        <div className="stats-value">{value}</div>
        <div className="stats-title">{title}</div>
        {trend && <div className="stats-trend">↑ {trend}%</div>}
      </div>
    </div>
  );
};

export default StatsCard;
