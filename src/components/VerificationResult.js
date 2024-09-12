import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/VerificationResult.css'; // Import the CSS file

const VerificationResult = () => {
  const location = useLocation();
  const { state } = location;
  const { success, message } = state || {};

  const navigate = useNavigate();
  const handleSelect = () => {
    navigate('/');
  };

  const handleActivate = () => {
    // Add functionality to activate the plan
  };

  return (
    <div className="result-page">
      <div className="result-card">
        <h1>{success ? 'Wohooo.. Your document is verified!!' : 'Document verification failed'}</h1>
        {success && (
          <>
            <p>Proceed to activate your plan</p>
            <div className="button-container">
            <button className="button-select" onClick={handleSelect}>
                Go to Home Page
              </button>
              <button className="button-select" onClick={handleActivate}>
                Activate Plan
              </button>
              
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationResult;
