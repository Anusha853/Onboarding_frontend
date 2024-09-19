// ActivatePlan.js
import React from 'react';
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

export default ActivatePlan;
