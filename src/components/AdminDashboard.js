import React, { useState, useEffect } from 'react';
import '../Styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [filterVerification, setFilterVerification] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeTab, setActiveTab] = useState('customer');

  useEffect(() => {
    // Fetch customers from backend API
    const fetchCustomers = async () => {
      const response = await fetch('/api/customers'); // Update with your API endpoint
      const data = await response.json();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleVerificationChange = (e) => {
    setFilterVerification(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDeactivate = (userId) => {
    // Logic to deactivate user
  };

  const filteredCustomers = customers
    .filter(customer => filterType === 'All' || customer.customer_type === filterType)
    .filter(customer => filterVerification === 'All' || customer.verification_status === filterVerification)
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.username.localeCompare(b.username);
      } else {
        return b.username.localeCompare(a.username);
      }
    });

  return (
    <div className="admin-dashboard">
      <div className="button-group">
        <button onClick={() => handleTabChange('customer')} className={activeTab === 'customer' ? 'active' : ''}>Customer</button>
        <button onClick={() => handleTabChange('verification')} className={activeTab === 'verification' ? 'active' : ''}>Document Verification Log</button>
      </div>

      {activeTab === 'customer' && (
        <>
          <div className="filters">
            <select onChange={handleFilterChange} value={filterType}>
              <option value="All">All Types</option>
              <option value="1">Personal</option>
              <option value="2">Business</option>
              <option value="3">Enterprise</option>
              <option value="4">Government</option>
            </select>

            <select onChange={handleVerificationChange} value={filterVerification}>
              <option value="All">All Verification Statuses</option>
              <option value="Success">Success</option>
              <option value="Failure">Failure</option>
            </select>

            <select onChange={handleSortChange} value={sortOrder}>
              <option value="asc">Sort Ascending</option>
              <option value="desc">Sort Descending</option>
            </select>
          </div>

          <table>
            <thead>
              <tr>
                <th>Seq No.</th>
                <th>Username</th>
                <th>Customer Type</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={customer.user_id}>
                  <td>{index + 1}</td>
                  <td>{customer.username}</td>
                  <td>{customer.customer_type}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone_number}</td>
                  <td>
                    <button onClick={() => handleDeactivate(customer.user_id)}>Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === 'verification' && (
        <div>
          <h2>Document Verification Log</h2>
          {/* Implement document verification log details here */}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;