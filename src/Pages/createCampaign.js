import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import "../styles/CreateCampaign.css";

const CreateCampaign = () => {
  const [form, setForm] = useState({
    name: '',
    segment: [{ field: '', operator: '', value: '' }],
    messageTemplate: '',
  });
  const [created, setCreated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  // useNavigate hook for redirection

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setCreated(false);
  };

  const updateSegmentRule = (index, key, value) => {
    const updated = [...form.segment];
    updated[index][key] = value;
    setForm({ ...form, segment: updated });
  };

  const addRule = () => {
    setForm({ ...form, segment: [...form.segment, { field: '', operator: '', value: '' }] });
  };

  const removeRule = (index) => {
    const updated = form.segment.filter((_, i) => i !== index);
    setForm({ ...form, segment: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      await axios.post('https://mini-crm-backend-84ex.onrender.com/api/campaigns', form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCreated(true);
      setForm({ name: '', segment: [{ field: '', operator: '', value: '' }], messageTemplate: '' });

      // Redirect to the campaign history page after successful creation
      navigate('/campaign-history');
      
    } catch (err) {
      console.error(err);
      setError('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-campaign">
      <h2>Create Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Campaign Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <h3>Segment Rules</h3>
        {form.segment.map((rule, index) => (
          <div key={index} className="rule-row">
            <input
              placeholder="Field (e.g., spend)"
              value={rule.field}
              onChange={(e) => updateSegmentRule(index, 'field', e.target.value)}
            />
            <select
              value={rule.operator}
              onChange={(e) => updateSegmentRule(index, 'operator', e.target.value)}
            >
              <option value="">Operator</option>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value=">=">&ge;</option>
              <option value="<=">&le;</option>
              <option value="==">==</option>
              <option value="!=">!=</option>
            </select>
            <input
              placeholder="Value"
              value={rule.value}
              onChange={(e) => updateSegmentRule(index, 'value', e.target.value)}
            />
            <button type="button" onClick={() => removeRule(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addRule}>+ Add Rule</button>

        <div>
          <label>Message Template</label>
          <textarea
            name="messageTemplate"
            placeholder="Your message content here..."
            value={form.messageTemplate}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Campaign'}
        </button>

        {created && <p className="success">✅ Campaign created!</p>}
        {error && <p className="error">❌ {error}</p>}
      </form>
    </div>
  );
};

export default CreateCampaign;
