import React, { useEffect, useState } from 'react';
import '../Styles/AirtelPlans.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Plans() {
  const navigate = useNavigate();
  const location = useLocation();

  const [customerType, setCustomerType] = useState(null);
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState({
    personal: [],
    enterprise: [],
    business: [],
    government: [],
    personalAddon: [],
  });

  useEffect(() => {
    // Fetch customerType from localStorage
    const loggedInCustomerType = localStorage.getItem('customerType');
    if (loggedInCustomerType) {
      setCustomerType(parseInt(loggedInCustomerType, 10));
    }
  }, []);

  useEffect(() => {
    // Fetch all plans from the backend
    const apiUrl = process.env.REACT_APP_BASE_URL;
    fetch(`${apiUrl}/user/plans/all`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setPlans(data);
        filterPlans(data);
      })
      .catch(error => console.error('Error fetching plans:', error));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');

    if (category) {
      scrollToSection(category);
    }
  }, [location]);

  const filterPlans = (plans) => {
    const personalPlans = plans.filter(plan => plan.plan_type.plan_type_id === 1);
    const enterprisePlans = plans.filter(plan => plan.plan_type.plan_type_id === 3);
    const businessPlans = plans.filter(plan => plan.plan_type.plan_type_id === 2);
    const governmentPlans = plans.filter(plan => plan.plan_type.plan_type_id === 4);
    const personalPlansAddon = plans.filter(plan => plan.plan_type.plan_type_id === 1 && plan.addon);

    setFilteredPlans({
      personal: personalPlans,
      enterprise: enterprisePlans,
      business: businessPlans,
      government: governmentPlans,
      personalAddon: personalPlansAddon,
    });
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelect = (plan) => {
    console.log('Selected Plan:', plan);
    
    const isLoggedIn = !!localStorage.getItem('user');

    if (isLoggedIn) {
      const storedCustomerType = parseInt(localStorage.getItem('customerType'), 10);
      // const userId = localStorage.getItem('userId');
      // console.log("User id ", userId);
      // localStorage.setItem('planId', plan.planId);
      // console.log(plan.planId);
      if (storedCustomerType !== plan.plan_type.plan_type_id) {
        alert("You can't select this plan as it doesn't match your registered category!");
        return;
      }

      navigate('/plan-confirmation', { state: { plan } });
    } else {
      alert('Please register/login before selecting a plan. Redirecting...');
      setTimeout(() => {
        navigate('/auth');
      }, 1000);
    }
  };

  const renderPlans = (plans) => {
    return plans.map((plan, index) => (
      <div key={index} className="plan-card1">
        <h2 style={{ color: 'white' }}>₹{plan.price}</h2>
        <h3>{plan.plan_name}</h3>
        <p>{plan.plan_description}</p>
        <p>{plan.validity_days} days</p>
        <button className="select-button" onClick={() => handleSelect(plan)}>Select</button>
      </div>
    ));
  };

  return (
    <div className="airtel-plans">
      <div className="explore-more-top">
        <button
          className="explore-button"
          onClick={() => navigate('/total-plans')}
        >
          Explore All Plans
        </button>
      </div>

      {customerType === 1 && (
        <>
          <div id="Personal Plans" className="plan-section1">
            <h2>Personal Plans</h2>
            <div className="plans-row">
              {renderPlans(filteredPlans.personal)}
            </div>
          </div>

          <div className="plan-section2">
            <div className="plans-row">
              {renderPlans(filteredPlans.personalAddon)}
            </div>
          </div>
        </>
      )}

      {customerType === 3 && (
        <div id="Enterprise Plans" className="plan-section1">
          <h2>Enterprise Plans</h2>
          <div className="plans-row">
            {renderPlans(filteredPlans.enterprise)}
          </div>
        </div>
      )}

      {customerType === 2 && (
        <div id="Business Plans" className="plan-section1">
          <h2>Business Plans</h2>
          <div className="plans-row">
            {renderPlans(filteredPlans.business)}
          </div>
        </div>
      )}

      {customerType === 4 && (
        <div id="Government Plans" className="plan-section1">
          <h2>Government Plans</h2>
          <div className="plans-row">
            {renderPlans(filteredPlans.government)}
          </div>
        </div>
      )}

      {customerType === null && (
        <>
          <div id="Personal Plans" className="plan-section1">
            <h2>Personal Plans</h2>
            <div className="plans-row">
              {renderPlans(filteredPlans.personal)}
            </div>
          </div>

          <div id="Enterprise Plans" className="plan-section1">
            <h2>Enterprise Plans</h2>
            <div className="plans-row">
              {renderPlans(filteredPlans.enterprise)}
            </div>
          </div>

          <div id="Business Plans" className="plan-section1">
            <h2>Business Plans</h2>
            <div className="plans-row">
              {renderPlans(filteredPlans.business)}
            </div>
          </div>

          <div id="Government Plans" className="plan-section1">
            <h2>Government Plans</h2>
            <div className="plans-row">
              {renderPlans(filteredPlans.government)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Plans;



