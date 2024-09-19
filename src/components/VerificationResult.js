import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/VerificationResult.css'; // Import the CSS file

const VerificationResult = () => {
  const location = useLocation();
  const { state } = location;
  const { success, message } = state || {};
  const planId=localStorage.getItem('planId');
 

  const navigate = useNavigate();
  const handleActivate = async () => {
    console.log(planId);
    try {
      const userId = localStorage.getItem('userId');
      const res = await fetch(`http://localhost:7777/user/user-plans/add?userId=${userId}&planId=${planId}`, {
        method: 'POST',
      });

      if (res.ok) {
        alert('Plan activated successfully!');
        navigate('/'); // Redirect to home or another appropriate page
      } else {
        const errorMessage = await res.text();
        console.error('Error activating plan:', errorMessage);
        alert('Error activating plan. Please try again.');
      }
    } catch (error) {
      console.error('Error activating plan:', error);
      alert('An error occurred while activating the plan.');
    }
  };

  // const handleGoBack = () => {
  //   navigate('/doc-verify'); // Redirect back to document verification page
  // };

  const handleGoBack = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const res = await fetch(`http://localhost:7777/user/document/delete?userId=${userId}`, {
        method: 'DELETE',
      });
  
      if (res.ok) {
        navigate('/doc-verify'); // Redirect back to document verification page after deletion
      } else {
        const errorMessage = await res.text();
        console.error('Error deleting document:', errorMessage);
        alert('Error deleting document. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('An error occurred while deleting the document.');
    }
  };
  

  return (
    <div className="result-page">
      <div className="result-card">
        {/* <h1>{success ? 'Wohooo.. Your document is verified!!' : 'Document verification failed'}</h1>
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


        )} */}

        <h1>{success ? 'Document Verified' : 'Document Verification Unsuccessful'}</h1>
        <p>{message}</p>
        {success ? (
          <div className="button-container">
            <button className="button-select" onClick={() => navigate('/')}>Go to Home Page</button>
            <button className="button-select" onClick={handleActivate}>Activate Plan</button>
            
          </div>
        ) : (
          <button className="button-select" onClick={handleGoBack}>Go Back to Upload</button>
        )}


      </div>
    </div>
  );
};

export default VerificationResult;
