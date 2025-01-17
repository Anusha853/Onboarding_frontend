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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(password.trim() === '' || confirmPassword.trim() === '');
  }, [password, confirmPassword]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const customerTypeMap = {
    1: 'Personal',
    2: 'Business',
    3: 'Enterprise',
    4: 'Government',
  };

  const handleUpdatePassword = async () => {
    setOtpPopupVisible(true); // Show OTP popup
    try {
      const apiUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(
        `${apiUrl}/user/update-password`,
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
    try {
      const apiUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(
        `${apiUrl}/user/verify`,
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

  // Password validation function
  const validatePassword = (password) => {
    // Regex to check for a password 8-10 characters long with at least one special char and one number
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,10})/;
    return passwordRegex.test(password);
  };

  const handlePasswordUpdate = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Validate password complexity
    if (!validatePassword(password)) {
      alert("Password must be 8-15 characters long, include letters, numbers, and special characters.");
      return;
    }

    // Update password
    try {
      const apiUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(
        `${apiUrl}/user/change-password`,
        { username: userDetails.username, newPassword: password }
      );
      if (response.status === 200) {
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
        const apiUrl = process.env.REACT_APP_BASE_URL;
        const response = await axios.post(
          `${apiUrl}/user/profile`,
          { username, password }
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
      <div className={`profile-container ${otpPopupVisible || passwordPopupVisible ? "blurred" : ""}`}>
        {userDetails ? (
          <>
            <div className="profile-details">
              <div className="personal-details-left">
                <h2>Profile Details</h2>
                <p><strong>Username:</strong> {userDetails.username}</p>
                <p><strong>Phone:</strong> {userDetails.phone}</p>
                <p><strong>Customer Type:</strong> {customerTypeMap[userDetails.customerType]}</p>
              </div>
              <div className="personal-details-right">
                <div className="verification-status">
                  {userDetails.documentVerification ? (
                    <p>Document Verified <span className="verification-icon">✔️</span></p>
                  ) : (
                    <p>Document yet to be Verified <span className="verification-icon">❌</span></p>
                  )}
                </div>
              </div>
              <button className="update-password-button" onClick={handleUpdatePassword}>
                Update Password
              </button>
            </div>

            {/* Plans Section */}
            <div className="user-plan">
              <div className="plans-header">
                <h3>Your Current Plans</h3>
              </div>
              <div className="plans-grid">
                {userDetails.plans && userDetails.plans.length > 0 ? (
                  userDetails.plans.map((plan, index) => (
                    <div key={index} className="plan-container">
                      <p><strong>Plan Name:</strong> {plan.planName}</p>
                      <p><strong>Description:</strong> {plan.planDescription}</p>
                      <p><strong>Price:</strong> ₹{plan.price}</p>
                      <p><strong>Validity:</strong> {plan.validityDays} days</p>
                      <div className="service-action">
                        {plan.activation ? (
                          <p className="active-service"><strong>Currently Active</strong></p>
                        ) : (
                          <p className="inactive-service"><strong>Currently Deactive</strong></p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-plan-message">You currently have no active plans.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>No profile data available.</p>
        )}
        <button className="logout-button" onClick={handleLogout}>Log out</button>
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
            <button
              disabled={isButtonDisabled}
              style={{ backgroundColor: isButtonDisabled ? '#d3d3d3' : '#FFA500' }}
              onClick={handlePasswordUpdate}
            >
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
