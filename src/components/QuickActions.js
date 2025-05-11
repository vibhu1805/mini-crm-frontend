// src/components/QuickActions.js
import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="quick-actions">
      <h2>Quick Actions</h2>
      <div className="actions">
        <Link to="/campaigns/new" className="action-button">
          Create New Campaign
        </Link>
        <Link to="/segments/new" className="action-button">
          Create New Segment
        </Link>
        <Link to="/customer/new" className="action-button">
          Add New Customer
        </Link>
        <Link to="/order/new" className="action-button">
          Add New Order
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
