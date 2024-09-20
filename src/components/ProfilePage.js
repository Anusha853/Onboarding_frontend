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

*/

//<div className={`profile-container ${otpPopupVisible || passwordPopupVisible ? "blurred" : ""}`}>

// const handleUpdatePassword = async () => {
//   console.log("in otp");
//   setOtpPopupVisible(true); // Show OTP popup
//   // Call API to send OTP
//   try {
//     const response = await axios.post(
//       "http://localhost:7777/user/update-password",
//       { username: userDetails.username } // Send the username instead of email
//     );
//     if (response.status === 200) {
//       alert("OTP has been sent to your email");
//     }
//   } catch (error) {
//     alert("Failed to send OTP");
//   }
// };

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/ProfilePage.css";
 
function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpPopupVisible, setOtpPopupVisible] = useState(false);
  const [passwordPopupVisible, setPasswordPopupVisible] = useState(false);
  const navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
 
  const handleSeePlans = () => {
    navigate("/plans");
  };
  const customerTypeMap = {
    1: 'Personal',
    2: 'Business',
    3: 'Enterprise',
    4: 'Government',
  };
  const handleUpdatePassword = async () => {
      console.log("in otp");
      setOtpPopupVisible(true); // Show OTP popup
      // Call API to send OTP
      try {
        const response = await axios.post(
          "http://localhost:7777/user/update-password",
          { username: userDetails.username } // Send the username instead of email
        );
        if (response.status === 200) {
          alert("OTP has been sent to your email");
        }
      } catch (error) {
        alert("Failed to send OTP");
      }
    };
 
  const handleOtpVerification = async () => {
    // Verify OTP
    try {
      const response = await axios.post(
        "http://localhost:7777/user/verify",
        { email: userDetails.email, otp: otp }
      );
      if (response.status === 200) {
        setOtpPopupVisible(false); // Close OTP popup
        setPasswordPopupVisible(true); // Show password update popup
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      alert("Error during OTP verification");
    }
  };
 
  const handlePasswordUpdate = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
 
    // Update password
    try {
      const response = await axios.post(
        "http://localhost:7777/user/change-password",
        { username: userDetails.username, newPassword: password }
      );
      if (response.status === 200) {
      console.log(password);
        alert("Password updated successfully");
        setPasswordPopupVisible(false); // Close password popup
      } else {
        alert("Failed to update password");
      }
    } catch (error) {
      alert("Error during password update");
    }
  };
 
  useEffect(() => {
    const fetchUserDetails = async () => {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
 
      if (!username || !password) {
        navigate("/login");
        return;
      }
 
      try {
        const response = await axios.post(
          "http://localhost:7777/user/profile",
          {
            username,
            password,
          }
        );
 
        if (response.status === 200) {
          setUserDetails(response.data);
        } else {
          setError("Failed to retrieve user details");
        }
      } catch (err) {
        setError("Error occurred while fetching data");
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
      {/* Apply blur effect only to this main content */}
      <div
        className={`profile-container ${
          otpPopupVisible || passwordPopupVisible ? "blurred" : ""
        }`}
      >
        {userDetails ? (
          <>
            <div className="profile-details">
              <div className="personal-details-left">
                <h2>Profile Details</h2>
                <p>
                  <strong>Username:</strong> {userDetails.username}
                </p>
                <p>
                  <strong>Phone:</strong> {userDetails.phone}
                </p>
                <p>
                  <strong>Customer Type:</strong>{" "}
                  {customerTypeMap[userDetails.customerType]}
                </p>
              </div>
              <div className="personal-details-right">
                {/* Document Verification */}
                <div className="verification-status">
                  {userDetails.documentVerification ? (
                    <p>
                      Document Verified{" "}
                      <span className="verification-icon">✔️</span>
                    </p>
                  ) : (
                    <p>
                      Document yet to be Verified{" "}
                      <span className="verification-icon">❌</span>
                    </p>
                  )}
                </div>
              </div>
              {/* Update Password Button */}
              <button
                className="update-password-button"
                onClick={handleUpdatePassword}
              >
                Update Password
              </button>
            </div>

            {/* Plans Section */}
            <div className="user-plan">
              <div className="plans-header">
                <h3>Your Current Plans</h3>
                {/* General service action is no longer needed here since we're adding it per plan */}
              </div>
              <div className="plans-grid">
                {userDetails.plans && userDetails.plans.length > 0 ? (
                  userDetails.plans.map((plan, index) => (
                    <div key={index} className="plan-container">
                      <p>
                        <strong>Plan Name:</strong> {plan.planName}
                      </p>
                      <p>
                        <strong>Description:</strong> {plan.planDescription}
                      </p>
                      <p>
                        <strong>Price:</strong> ${plan.price}
                      </p>
                      <p>
                        <strong>Validity:</strong> {plan.validityDays} days
                      </p>

                      {/* Display activation status for each plan */}
                      <div className="service-action">
                        {plan.activation  ? (
                          <p className="active-service">
                            <strong>Currently Active</strong>
                          </p>
                        ) : (
                          <p className="inactive-service">
                            <strong>Currently Deactive</strong>
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-plan-message">
                    You currently have no active plans.
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>No profile data available.</p>
        )}
        {/* Log out button */}
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>

      {/* OTP Popup */}
      {otpPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h3>Enter OTP</h3>
            <p>An OTP has been sent to your registered email.</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <button onClick={handleOtpVerification}>Verify OTP</button>
          </div>
        </div>
      )}

      {/* Password Update Popup */}
      {passwordPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h3>Update Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            <button onClick={handlePasswordUpdate}>Update Password</button>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default ProfilePage;
 