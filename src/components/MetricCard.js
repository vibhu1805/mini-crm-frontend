// src/components/MetricCard.js
import React from 'react';

const MetricCard = ({ title, value, icon, trend }) => {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
