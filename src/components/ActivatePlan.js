import React, {useState,useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import '../Styles/ActivatePlan.css'; // Import the CSS file for styling

const ActivatePlan = () => {
    const [showPopup, setShowPopup] = useState(false);
    const location=useLocation();
    // const { planId } = location.state || {};
    const planId=localStorage.getItem('planId');
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

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
    
    const handleActivatePlan = async () => {
    // Logic to activate the plan goes here
    console.log(planId);

    try {
        const userId = userDetails.userId;
        
        const res = await fetch(`http://localhost:7777/user/user-plans/add?userId=${userId}&planId=${planId}`, {
          method: 'POST',
        });
  
        if (res.ok) {
          setShowPopup(true);  // Show the popup
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
  // const closePopup = () => {
  //   setIsActivated(false);
  //   setShowBlur(false); // Remove blur
  //   navigate('/'); // Redirect to home or another appropriate page
  // };

  const goBackConfirm=()=>{
    navigate(-1); 
  }

  return (
    <div className="page-container">
            <div className={`activate-plan-container ${showPopup ? 'blur-background' : ''}`}>
                <div className="activation-card">
                    <h1>Plan Activation</h1>
                    <p>Your document is already verified!</p>
                    <p>To activate your plan, click the button below.</p>
                    <div class="button-container">
                    <button className="go-back" onClick={goBackConfirm}>
                        Go back
                    </button>
                    <button className="activate-button" onClick={handleActivatePlan}>
                        Activate Your Plan
                    </button>
                    
                    </div>
                </div>

                
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Plan Activated!</h2>
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
  );
};

export default ActivatePlan;


/**/


// ActivatePlan.js
/*import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/ActivatePlan.css'; // Import the CSS file for styling

const ActivatePlan = () => {
    const location=useLocation();
    // const { planId } = location.state || {};
    const planId=localStorage.getItem('planId')
    
    const handleActivatePlan = async () => {
    // Logic to activate the plan goes here
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
  const navigate=useNavigate();
  const goBackConfirm=()=>{
    navigate(-1); 
  }

  return (
    <div className="activate-plan-container">
      <div className="activation-card">
        <h1>Plan Activation</h1>
        <p>To activate your plan, click the button below.</p>
        <button className="activate-button" onClick={handleActivatePlan}>
          Activate Your Plan
        </button>
      </div>
      <button className="go-back" onClick={goBackConfirm}>
          Go back
      </button>
    </div>
  );
};

export default ActivatePlan;*/
