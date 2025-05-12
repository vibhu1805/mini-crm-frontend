import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddCustomerForm.css';

const AddCustomerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (!name || !email || !phone) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to add a customer.');
      setLoading(false);
      return;
    }

    const customerData = { name, email, phone };

    try {
      const response = await axios.post('https://mini-crm-backend-84ex.onrender.com/api/customers', customerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Customer added successfully!');
        setName('');
        setEmail('');
        setPhone('');
      }
    } catch (err) {
      console.error('Error response:', err.response);
      if (err.response) {
        setError(err.response.data.error || 'Failed to save customer');
      } else {
        setError('Error communicating with the server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-customer-form">
      <h2>Add Customer</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Adding...' : 'Add Customer'}
        </button>
      </form>
    </div>
  );
};

export default AddCustomerForm;
