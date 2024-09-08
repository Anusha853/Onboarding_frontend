import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/ProfilePage.css';  // Import the CSS
import Navbar from './Navbar';

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); // Redirect to homepage after logout
};
const handleSeePlans = () => {
  navigate('/plans'); // Redirect to the Plans page
};


  const customerTypeMap = {
    1: 'Personal',
    2: 'Business',
    3: 'Enterprise',
    4: 'Government',
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      const userId = localStorage.getItem('userId');

      if (!username || !password) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.post('http://localhost:7777/user/profile', {
          username,
          password,
        });

        if (response.status === 200) {
          setUserDetails(response.data);
        } else {
          setError('Failed to retrieve user details');
        }
      } catch (err) {
        setError('Error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar/>
    <div className="profile-container">
      {userDetails ? (
        <>
          <div className="profile-details">
            <h2>Profile Details</h2>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <p>
                <strong>Customer Type:</strong>{" "}
                {customerTypeMap[userDetails.customerType]}
              </p>

          {/* Document Verification */}
          <div className="verification-status">
                {userDetails.document_verification ? (
                  <>
                    <p>
                      Document Verified{" "}
                      <span className="verification-icon">✔️</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Document yet to be Verified{" "}
                      <span className="verification-icon">❌</span>
                    </p>
                  </>
                )}
              </div>
            </div>
  
          <div className="user-plan">
            <h3>Your Current Plan</h3>
            {userDetails.plan_name ? (
              <>
                <p><strong>Plan Name:</strong> {userDetails.plan_name}</p>
                <p><strong>Description:</strong> {userDetails.plan_description}</p>
                <p><strong>Price:</strong> ${userDetails.price}</p>
                <p><strong>Validity:</strong> {userDetails.validity_days} days</p>
              </>
            ) : (
              <p className="no-plan-message">You currently have no active plans.</p>
            )}
            {/* Service Activation */}
            <div className="verification-status">
                {userDetails.plan_name && userDetails.document_verification ? (
                  <p className="active-service">
                    <strong>Service is Active</strong>
                  </p>
                ) : (
                  <p className="inactive-service">
                    <strong>Service is Not Active</strong>
                  </p>
                )}
              </div>
          </div>
        </>
      ) : (
        <p>No profile data available.</p>
      )}
      <div className="buttons-container">
          <button className="see-plans-button" onClick={handleSeePlans}>See Plans</button>
          <Link to="/">
            <button className="logout-button" onClick={handleLogout}>Log out</button>
          </Link>
        </div>
      </div>
      </div>
  );
}

export default ProfilePage;



/*import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/ProfilePage.css';  // Import the CSS
import Navbar from './Navbar';

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); // Redirect to homepage after logout
};

  const customerTypeMap = {
    1: 'Personal',
    2: 'Business',
    3: 'Enterprise',
    4: 'Government',
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (!username || !password) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.post('http://localhost:7777/user/profile', {
          username,
          password,
        });

        if (response.status === 200) {
          setUserDetails(response.data);
        } else {
          setError('Failed to retrieve user details');
        }
      } catch (err) {
        setError('Error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar/>
    <div className="profile-container">
      {userDetails ? (
        <>
          <div className="profile-details">
            <h2>Profile Details</h2>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <p><strong>Customer Type:</strong> {customerTypeMap[userDetails.customerType]}</p>
          </div>
  
          <div className="user-plan">
            <h3>Your Current Plan</h3>
            {userDetails.plan_name ? (
              <>
                <p><strong>Plan Name:</strong> {userDetails.plan_name}</p>
                <p><strong>Description:</strong> {userDetails.plan_description}</p>
                <p><strong>Price:</strong> ${userDetails.price}</p>
                <p><strong>Validity:</strong> {userDetails.validity_days} days</p>
              </>
            ) : (
              <p className="no-plan-message">You currently have no active plans.</p>
            )}
          </div>
        </>
      ) : (
        <p>No profile data available.</p>
      )}
      <Link to="/">
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </Link>
      </div>
      </div>
  );
}

export default ProfilePage;*/


