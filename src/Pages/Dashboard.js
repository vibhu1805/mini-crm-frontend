// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import MetricCard from '../components/MetricCard';
import RecentCampaigns from '../components/RecentCampaigns';
import QuickActions from '../components/QuickActions';
import '../styles/DashBoard.css';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    activeCampaigns: 0,
  });
  const [recentCampaigns, setRecentCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://mini-crm-backend-84ex.onrender.com/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        setMetrics({
          totalCustomers: data.totalCustomers || 0,
          totalOrders: data.totalOrders || 0,
          activeCampaigns: data.activeCampaigns || 0,
        });

        setRecentCampaigns(Array.isArray(data.recentCampaigns) ? data.recentCampaigns : []);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setError('Failed to load dashboard. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      <div className="metrics-grid">
        <MetricCard title="Total Customers" value={metrics.totalCustomers} icon="👥" trend="up" />
        <MetricCard title="Total Orders" value={metrics.totalOrders} icon="🛒" trend="up" />
        <MetricCard title="Active Campaigns" value={metrics.activeCampaigns} icon="📢" trend="neutral" />
      </div>
      <div className="dashboard-content">
        <RecentCampaigns campaigns={recentCampaigns} />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
