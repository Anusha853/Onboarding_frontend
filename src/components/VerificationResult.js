
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerificationResult = () => {
  const location = useLocation();
  const { state } = location;
  const { success, message } = state || {};

  const navigate=useNavigate();
  const handleSelect=()=>{
    navigate('/');
  }

  const uname=localStorage.getItem('username');

  return (
    <div className="result-page">
      <h1>Verification Result</h1>
      <p>Status: {success ? 'Success' : 'Failure'}</p>
      <p>Message: {message}</p>
      {success && (
        <>
          <button className="button1" onClick={handleSelect}>Go to home page</button>
        </>
      )}
    </div>
  );
};

export default VerificationResult;


//<p>Aadhaar Number: {aadhaarNumber}</p>