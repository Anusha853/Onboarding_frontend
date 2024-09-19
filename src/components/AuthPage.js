import React, { useState } from 'react';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import '../Styles/AuthPage.css'; // CSS for switch page

function AuthPage() {
  const [isRegistered, setIsRegistered] = useState(false); // To track the state

  const handleSwitchToRegister = () => {
    setIsRegistered(false); // Switch to Register
  };

  const handleSwitchToLogin = () => {
    setIsRegistered(true); // Switch to Login
  };

  return (
    <div className="switch-container">
      <div className="switch-box">
        <div className="switch-tabs">
          <button 
            onClick={handleSwitchToRegister} 
            className={!isRegistered ? 'active-tab' : ''}>
            Sign Up
          </button>
          <button 
            onClick={handleSwitchToLogin} 
            className={isRegistered ? 'active-tab' : ''}>
            Sign In
          </button>
        </div>

        {/* Show Register or Login based on isRegistered */}
        {!isRegistered ? (
          <RegisterPage />
        ) : (
          <LoginPage />
        )}
      </div>
    </div>
  );
}

export const isLoggedIn = () => {
  return !!localStorage.getItem("user"); // Adjust based on how you store the auth token
};

export default AuthPage;




/*import React, { useState } from 'react';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import '../Styles/AuthPage.css'; // CSS for switch page

function AuthPage() {
  const [isRegistered, setIsRegistered] = useState(false); // To track the state

  const handleSwitchToRegister = () => {
    setIsRegistered(false); // Switch to Register
  };

  const handleSwitchToLogin = () => {
    setIsRegistered(true); // Switch to Login
  };

  return (
    <div className="switch-container">
      <div className="switch-box">
        <div className="switch-tabs">
          <button 
            onClick={handleSwitchToRegister} 
            className={!isRegistered ? 'active-tab' : ''}>
            Sign Up
          </button>
          <button 
            onClick={handleSwitchToLogin} 
            className={isRegistered ? 'active-tab' : ''}>
            Sign In
          </button>
        </div>

      
        {!isRegistered ? (
          <RegisterPage />
        ) : (
          <LoginPage />
        )}
      </div>
    </div>
  );
}

export default AuthPage;*/
