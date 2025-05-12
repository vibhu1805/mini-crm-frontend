import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CampaignHistory.css';

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get('https://mini-crm-backend-84ex.onrender.com/api/campaigns/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCampaigns(res.data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch campaign history');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="campaign-history">
      <h2>📊 Campaign History</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Audience Size</th>
              <th>Sent</th>
              <th>Failed</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((camp) => (
              <tr key={camp._id}>
                <td>{camp.name}</td>
                <td>{camp.type}</td>
                <td>{camp.audienceSize}</td>
                <td>{camp.sent}</td>
                <td>{camp.failed}</td>
                <td>{new Date(camp.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CampaignHistory;
