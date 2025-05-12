import React from 'react';
import AddCustomerForm from '../components/AddCustomerForm';
import '../styles/AddCustomerForm.css';

const CustomerManagementPage = () => {
  return (
    <div className="customer-management-container">
      <h1>Customer Management</h1>
      <AddCustomerForm />
    </div>
  );
};

export default CustomerManagementPage;
