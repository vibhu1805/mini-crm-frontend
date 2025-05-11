// src/components/RecentCampaigns.js
import React from 'react';
import { Link } from 'react-router-dom';

const RecentCampaigns = ({ campaigns }) => {
  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'badge-active',
      completed: 'badge-completed',
      failed: 'badge-failed',
      draft: 'badge-draft',
    };
    return <span className={`status-badge ${statusClasses[status] || ''}`}>{status}</span>;
  };

  if (!Array.isArray(campaigns) || campaigns.length === 0) {
    return (
      <div className="recent-campaigns">
        <h2>Recent Campaigns</h2>
        <p>No recent campaigns found.</p>
      </div>
    );
  }

  return (
    <div className="recent-campaigns">
      <h2>Recent Campaigns</h2>
      <ul className="campaign-list">
        {campaigns.map((campaign) => (
          <li key={campaign._id || campaign.id} className="campaign-item">
            <div className="campaign-info">
              <h3>
                <Link to={`/campaigns/${campaign._id || campaign.id}`}>{campaign.name}</Link>
              </h3>
              <p>{new Date(campaign.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="campaign-stats">
              {getStatusBadge(campaign.status)}
              <span>Audience: {campaign.audienceSize}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentCampaigns;
