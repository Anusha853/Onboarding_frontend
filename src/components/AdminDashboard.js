import React, { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css';
// import {useNavigate} from 'react-router-dom';

// const navigate=useNavigate();
const AdminDashboard = ({ activeTab }) => {
  const [customers, setCustomers] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [filterVerification, setFilterVerification] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');

  const customerTypeMap = {
    1: 'Personal',
    2: 'Business',
    3: 'Enterprise',
    4: 'Government',
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  useEffect(() => {
    console.log('Customers state updated:', customers); // Log when customers state changes
  }, [customers]);
  

  const fetchAllCustomers = async () => {
    try {
      const response = await fetch('http://localhost:7777/admin/users'); // Your API endpoint for fetching all users
      const data = await response.json();
      console.log(data);
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchCustomersByType = async (customerType) => {
    try {
      const response = await fetch(`http://localhost:7777/admin/users/filter?customerType=${customerType}`);
      const data1 = await response.json();
      console.log("Filtered data:" ,data1);
      setCustomers(data1);
      console.log("Updated Filtered data:" ,customers);
      
    } catch (error) {
      console.error('Error fetching customers by type:', error);
    }
  };

  const fetchCustomersByDocumentStatus = async (isVerified) => {
    try {
      const response = await fetch(`http://localhost:7777/admin/users/document-status?isVerified=${isVerified}`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers by document status:', error);
    }
  };

  const handleFilterChange = (e) => {
    const selectedType = e.target.value;
    setFilterType(selectedType);
    console.log(selectedType);

    if (selectedType === 'All') {
      fetchAllCustomers();
    } else {
        //const customerType=customerTypeMap[selectedType]
        //console.log(customerType);
      fetchCustomersByType(selectedType);
    }
  };

  const handleVerificationChange = (e) => {
    const selectedVerification = e.target.value;
    setFilterVerification(selectedVerification);

    if (selectedVerification === 'All') {
      fetchAllCustomers();
    } else {
      fetchCustomersByDocumentStatus(selectedVerification === 'Verified');
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const togglePlanActivation = async (userId, planId) => {
    try {
      const response = await fetch(`http://localhost:7777/admin/users/plan/activation?userId=${userId}&planId=${planId}`, {
        method: 'POST'
      });

      if (response.ok) {
        alert('Plan activation status updated successfully.');
        fetchAllCustomers(); // Refresh the customer list after toggling
      } else {
        alert('Failed to update plan activation status.');
      }
    } catch (error) {
      console.error('Error toggling plan activation:', error);
    }
  };

  const handleToggleChange = (userId, planId, isActive) => {
    togglePlanActivation(userId, planId); // Call the API to toggle the plan
  };

  const handleDeactivate = (userId) => {
    // Logic to deactivate user
    console.log(`Deactivate user with ID: ${userId}`);
  };

  const handleLogout=()=>{
    window.location.href = 'http://localhost:3000';
  }

  const filteredCustomers = customers
    .filter(customer => filterType === 'All' || customer.customerTypeName === customerTypeMap[filterType])
    .filter(customer => filterVerification === 'All' || customer.documentStatus === filterVerification)
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.username.localeCompare(b.username);
      } else {
        return b.username.localeCompare(a.username);
      }
    });
    console.log('Filtered customers for rendering:', filteredCustomers);

  return (
    <div className="admin-dashboard">
      
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
              <option value="Verified">Verified</option>
              <option value="Not Verified">Not Verified</option>
            </select>

            <select onChange={handleSortChange} value={sortOrder}>
              <option value="asc">Sort Ascending</option>
              <option value="desc">Sort Descending</option>
            </select>

            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Seq No.</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>                
                <th>Customer Type</th>
                <th>Plans</th>
                <th>Document Verification Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={customer.user_id}>
                  <td>{index + 1}</td>
                  <td>{customer.username}</td>                  
                  <td>{customer.email}</td>
                  <td>{customer.phoneNo}</td>
                  <td>{customer.customerTypeName}</td>
                  {/* <td>{customer.planNames}
                    <button onClick={() => handleDeactivate(customer.user_id)}>Deactivate</button>
                  </td> */}
                  <td>
                  {customer.planNames.length > 0 ? (
                      customer.planNames.map((planName, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '10px', marginBottom:'5px' }}>{planName}</span>
                          <label className="switch">
                            <input
                              type="checkbox"
                              
                              onChange={() => handleToggleChange(customer.userId, customer.planIds[i], customer.planActivationStatuses[i])}
                              checked={customer.planActivationStatuses[i]}
                            />
                            <span className="slider"></span>
                          </label>
                        </div>
                      ))
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>{customer.documentStatus}</td>
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




