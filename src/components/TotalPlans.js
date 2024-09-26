import React, { useEffect, useState } from 'react';
import '../Styles/AirtelPlans.css';
import { useLocation, useNavigate } from 'react-router-dom';
 
function TotalPlans() {
  const navigate = useNavigate();
  const location = useLocation();
 
  const [customerType, setCustomerType] = useState(null);
  const [plans, setPlans] = useState([]);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
   
    if (category) {
      scrollToSection(category);
    }
  }, [location]);
 
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    // Fetch customerType from localStorage
    const loggedInCustomerType = localStorage.getItem('customerType');
    console.log(loggedInCustomerType);
 
    if (loggedInCustomerType) {
      setCustomerType(parseInt(loggedInCustomerType, 10)); // Convert to integer for comparison
    }
  }, []);
  const apiUrl = process.env.REACT_APP_BASE_URL;
 
  useEffect(() => {
    // Fetch all plans from backend
    fetch(`${apiUrl}/user/plans/all`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPlans(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching plans:', error));
  }, []);
 
  
 
  const handleSelect = (plan) => {

    console.log('Selected Plan:', plan);
    const isLoggedIn = !!localStorage.getItem('user');
 
    if (isLoggedIn) {
      const userId = localStorage.getItem('userId');
      console.log("User id ", userId);
      // Fetch the customer type from localStorage
      const storedCustomerType = parseInt(localStorage.getItem('customerType'), 10);
      console.log("Stored Customer Type:", storedCustomerType);
      console.log("Plan Type ID:", plan.plan_type.plan_type_id);
 
      // Check if customerType and plan.plan_type_id are integers and compare them
      if (storedCustomerType !== plan.plan_type.plan_type_id) {
        alert("You can't select this plan as it doesn't match your registered category!");
        return;
      }
     
      navigate('/plan-confirmation', { state: { plan } });
    } else {
      alert('Please register/login before selecting a plan. Redirecting...');
      setTimeout(() => {
        navigate('/auth'); // Redirect to the AuthPage after the message
      }, 1000); // Delay the redirection slightly to show the alert
    }
  };
 
  
  const personalPlans = plans.slice(0, 4);
  const personalPlansAddon = plans.slice(4, 8);
  const enterprisePlans = plans.slice(8, 12);
  const businessPlans = plans.slice(12, 16);
  const governmentPlans = plans.slice(16, 20);
 
  return (
    <div className="airtel-plans">
      <nav className="navbar-plans">
        <ul>
          <li onClick={() => scrollToSection('Personal Plans')}>Personal Plans</li>
          <li onClick={() => scrollToSection('Business Plans')}>Business Plans</li>
          <li onClick={() => scrollToSection('Enterprise Plans')}>Enterprise Plans</li>
          <li onClick={() => scrollToSection('Government Plans')}>Government Plans</li>
        </ul>
      </nav>
 
      <div id="Personal Plans" className="plan-section1">
        <h2>Personal Plans</h2>
        <div className="plans-row">
          {personalPlans.map((plan, index) => (
            <div key={index} className="plan-card1">
              <h2 style={{ color: 'white' }}>₹{plan.price}</h2>
              <h3>{plan.plan_name}</h3>
              <p>{plan.plan_description}</p>
              <p>{plan.validity_days} days</p>
              <button className="select-button" onClick={() => handleSelect(plan)}>Select</button>
            </div>
          ))}
        </div>
      </div>
      <div  className="plan-section2">
        <div className="plans-row">
          {personalPlansAddon.map((plan, index) => (
            <div key={index} className="plan-card2">
              <h2 style={{ color: 'white' }}>₹{plan.price}</h2>
              <h3>{plan.plan_name}</h3>
              <p>{plan.plan_description}</p>
              <p>{plan.validity_days} days</p>
              <button className="select-button" onClick={() => handleSelect(plan)}>Select</button>
            </div>
          ))}
        </div>
      </div>
 
      <div id="Business Plans" className="plan-section1">
        <h2>Business Plans</h2>
        <div className="plans-row">
          {enterprisePlans.map((plan, index) => (
            <div key={index} className="plan-card1">
              <h2 style={{ color: 'white' }}>₹{plan.price}</h2>
              <h3>{plan.plan_name}</h3>
              <p>{plan.plan_description}</p>
              <p>{plan.validity_days} days</p>
              <button className="select-button" onClick={() => handleSelect(plan)}>Select</button>
            </div>
          ))}
        </div>
      </div>
 
      <div id="Enterprise Plans" className="plan-section1">
        <h2>Enterprise Plans</h2>
        <div className="plans-row">
          {businessPlans.map((plan, index) => (
            <div key={index} className="plan-card1">
              <h2 style={{ color: 'white' }}>₹{plan.price}</h2>
              <h3>{plan.plan_name}</h3>
              <p>{plan.plan_description}</p>
              <p>{plan.validity_days} days</p>
              <button className="select-button" onClick={() => handleSelect(plan)}>Select</button>
            </div>
          ))}
        </div>
      </div>
 
      <div id="Government Plans" className="plan-section1">
        <h2>Government Plans</h2>
        <div className="plans-row">
          {governmentPlans.map((plan, index) => (
            <div key={index} className="plan-card1">
              <h2 style={{ color: 'white' }}>₹{plan.price}</h2>
              <h3>{plan.plan_name}</h3>
              <p>{plan.plan_description}</p>
              <p>{plan.validity_days} days</p>
              <button className="select-button" onClick={() => handleSelect(plan)}>Select</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
 
}
export default TotalPlans;

