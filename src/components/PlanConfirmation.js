// PlanConfirmation.js
import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/PlanConfirmation.css'; // Import the CSS file for styling
//import Navbar from './Navbar';


 
const PlanConfirmation = () => {
  const location = useLocation();
  const { plan } = location.state || {};
  const navigate=useNavigate();
  const userId = localStorage.getItem('userId');

  const [isVerified, setIsVerified] = useState(null);

  // const { id, title, price, description, validity } = plan;
  localStorage.setItem('planId', plan.plan_id);
  const planId=localStorage.getItem('planId');

  const checkDocumentVerification = async () => {
    try {
      const response = await fetch(`http://localhost:7777/user/document/status?userId=${userId}`);
      const isVerified = await response.json();
      setIsVerified(isVerified); 
      console.log(isVerified);
    } catch (error) {
      console.error('Error checking document verification status:', error);
    }
  };

  // Run the check when the component loads
  useEffect(() => {
    checkDocumentVerification();
  }, []);

  const handleButtonClick = () => {
    if (isVerified) {
      console.log(planId);
      navigate('/activate-plan', { state: { planId } }); // Redirect to plan activation page if verified
    } else {
      console.log(planId);
      navigate('/doc-verify',{state:{planId}}); // Redirect to document verification page if not verified
    }
  };

  const goBackConfirm=()=>{
    navigate(-1); 
  };
 
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
          <h2>{plan.plan_name}</h2>
          <p><strong>Description:</strong> {plan.plan_description}</p>
          <p><strong>Price:</strong> ₹{plan.price}</p>
          <p><strong>Validity:</strong> {plan.validity_days} days</p>
        </div>
      ) : (
        <p>No plan selected.</p>
      )}
      {isVerified === null ? (
        <p>Checking document verification status...</p>
      ):(
        <button className="proceed-button" onClick={handleButtonClick}>
          {isVerified ? 'Proceed to Service Activation' : 'Proceed to Document Verification'}
        </button>
      )
    }
    <button className="proceed-button" onClick={goBackConfirm}>Go Back</button>
    </div>
    </div>
  );
};
 
export default PlanConfirmation;
 
 