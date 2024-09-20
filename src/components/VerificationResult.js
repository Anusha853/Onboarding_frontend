import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/VerificationResult.css'; // Import the CSS file
import '../Styles/ActivatePlan.css';
import axios from "axios";

const VerificationResult = () => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const { state } = location;
  const { success, message } = state || {};
  const planId=localStorage.getItem('planId');

  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      console.log(username);
      console.log(password);
 
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
          console.log(userDetails);
          localStorage.setItem("userId", userDetails.userId);
          
          //console.log(userDetails.userId);
        } else {
          setError("Failed to retrieve user details");
        }
      } catch (err) {
        setError("Error occurred while fetching data");
      } finally {
      }
    };
 
    fetchUserDetails();
  }, []);

  const handleActivate = async () => {
    console.log(planId);
    try {
      const userId = userDetails.userId;
      const res = await fetch(`http://localhost:7777/user/user-plans/add?userId=${userId}&planId=${planId}`, {
        method: 'POST',
      });

      if (res.ok) {
        //alert('Plan activated successfully!');
        setShowPopup(true);
        //navigate('/'); // Redirect to home or another appropriate page
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
    const userId = userDetails.userId;
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
      <div className={`result-page-container ${showPopup ? 'blur-background' : ''}`}>
      <div className="result-card">
        

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

        {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h1>Plan Activated!</h1>
                        <p>Thank you! Your plan has been successfully activated.</p>
                        <button
                            className="close-popup-button"
                            onClick={() => {
                                setShowPopup(false);
                                navigate('/');
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}




      </div>
      </div>
    </div>
  );
};

export default VerificationResult;


/*import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/VerificationResult.css'; // Import the CSS file
import axios from "axios";

const VerificationResult = () => {
  const location = useLocation();
  const { state } = location;
  const { success, message } = state || {};
  const planId=localStorage.getItem('planId');

  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      console.log(username);
      console.log(password);
 
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
          console.log(userDetails);
          localStorage.setItem("userId", userDetails.userId);
          
          //console.log(userDetails.userId);
        } else {
          setError("Failed to retrieve user details");
        }
      } catch (err) {
        setError("Error occurred while fetching data");
      } finally {
      }
    };
 
    fetchUserDetails();
  }, []);

  const handleActivate = async () => {
    console.log(planId);
    try {
      const userId = userDetails.userId;
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

export default VerificationResult;*/
