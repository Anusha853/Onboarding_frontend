// PlanConfirmation.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/PlanConfirmation.css'; // Import the CSS file for styling
//import Navbar from './Navbar';
 
const PlanConfirmation = () => {
  const location = useLocation();
  const { plan } = location.state || {};
 
  return (
    <div>
      
    <div className="plan-confirmation1">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <h1>Plan Confirmation</h1>
      <br></br>
      {plan ? (
        <div className="plan-details-box1">
          <br></br>
          <h2>{plan.title}</h2>
          <p><strong>Description:</strong> {plan.description}</p>
          <p><strong>Price:</strong> {plan.price}</p>
          <p><strong>Validity:</strong> {plan.validity}</p>
        </div>
      ) : (
        <p>No plan selected.</p>
      )}
      <button className="proceed-button">Proceed to Document Verification</button>
    </div>
    </div>
  );
};
 
export default PlanConfirmation;
 
 