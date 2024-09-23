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
    fetch('http://localhost:7777/user/plans/all')
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



/*import React, { useEffect, useState } from 'react';
import '../Styles/AirtelPlans.css';
import { useLocation, useNavigate } from 'react-router-dom';
 
function Plans() {
  const navigate = useNavigate();
  const location = useLocation();
 
  const [customerType, setCustomerType] = useState(null);
  const [plans, setPlans] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      setCustomerType(parseInt(loggedInCustomerType, 10)); // Convert to integer for comparison
    }
  }, []);
 
  useEffect(() => {
    // Fetch all plans from backend
    fetch('http://localhost:7777/user/plans/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Before", data);
        setPlans(data);
        console.log(plans);
        filterPlans(data); // Filter plans after fetching
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
 
  /*const scrollToSection = (plan_type_description) => {
    document.getElementById(plan_type_description).scrollIntoView({ behavior: 'smooth' });
  };*/

 
  /*const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };
 
  const handleSelect = (plan) => {

    console.log('Selected Plan:', plan);
    const isLoggedIn = !!localStorage.getItem('user');
 
    if (isLoggedIn) {
      //const userId = localStorage.getItem('userId');
      // Fetch the customer type from localStorage
      const storedCustomerType = parseInt(localStorage.getItem('customerType'), 10);
 
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



/*import React, { useEffect } from 'react';
import  { useState } from 'react';
import '../Styles/AirtelPlans.css';
//import Navbar from './Navbar';
import { useLocation,useNavigate } from 'react-router-dom';

function Plans() {
  const navigate = useNavigate();
  const location=useLocation();

  const [customerType, setCustomerType] = useState(null);

  useEffect(() => {
    // Fetch customerType from backend (assuming it's stored in localStorage after login)
    const loggedInCustomerType = localStorage.getItem('customerType');
    if (loggedInCustomerType) {
      setCustomerType(parseInt(loggedInCustomerType)); // Convert to integer for comparison
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const plans = {
    Personal: [
      {
        type_id :1,
        id: 1,
        title: 'Social Media Enthusiast Plan',
        description: '5 GB/day for social media, Unlimited calls, 100 SMS/day',
        price: '₹299',
        validity: '60 days',
      },
      {
        type_id :1,
        id: 3,
        title: 'Health&Fitness Plan',
        description: '50 GB/month, Unlimited calls, 100 SMS/day, Free fitness apps',
        price: '₹499',
        validity: '30 days',
      },
      {
        type_id :1,
        id: 2,
        title: 'Gamers Paradise Plan',
        description: '100 GB/month for gaming, 500 minutes calls, 50 SMS/day',
        price: '₹799',
        validity: '90 days',
      },
      {
        type_id :1,
        id: 4,
        title: 'Travel Lovers Plan',
        description: '10 GB/month with roaming, Unlimited calls, 100 minutes international, 100 SMS/day',
        price: '₹999',
        validity: '30 days',
      }
    ],
    Business: [
      {
        type_id :2,
        id: 5,
        title: 'Startup Booster Plan',
        description: '200 GB/month, Unlimited calls, 1000 SMS/day, Free business tools',
        price: '₹2999',
        validity: '60 days',
      },
      {
        type_id :2,
        id: 6,
        title: 'Remote Work Plan',
        description: '500 GB/month, Unlimited calls, 2000 SMS/day, Free VPN and cloud storage',
        price: '₹4999',
        validity: '90 days',
      },
      {
        type_id :2,
        id: 7,
        title: 'Customer Engagement Plan',
        description: '1 TB/month, Unlimited calls, 5000 SMS/day, Free CRM tools.',
        price: '₹9999',
        validity: '30 days',
      },
      {
        type_id :2,
        id: 8,
        title: 'E-commerce Plan',
        description: '2 TB/month, Unlimited calls, 10000 SMS/day, Free e-commerce tools',
        price: '₹19999',
        validity: '30 days',
      }
    ],
    Enterprise: [
      {
        type_id :3,
        id: 9,
        title: 'Data-Driven Enterprise Plan',
        description: '10 TB/month, Unlimited calls, 20000 SMS/day, Free analytics tools',
        price: '₹49999',
        validity: '60 days',
      },
      {
        type_id :3,
        id: 10,
        title: 'Global Connectivity Plan',
        description: '20 TB/month, Unlimited calls, 1000 minutes international, 50000 SMS/day',
        price: '₹99999',
        validity: '90 days',
      },
      {
        type_id :3,
        id: 11,
        title: 'Innovation Hub Plan',
        description: '50 TB/month, Unlimited calls, 100000 SMS/day, Free R&D support',
        price: '₹199999',
        validity: '30 days',
      },
      {
        type_id :3,
        id: 12,
        title: 'Sustainability Plan',
        description: '100 TB/month, Unlimited calls and SMS, Free sustainability consulting',
        price: '₹299999',
        validity: '30 days',
      }
    ],
    Government: [
      {
        type_id :4,
        id: 13,
        title: 'Public Safety Plan',
        description: '5 TB/month, Unlimited calls, 10000 SMS/day, Priority access in emergencies',
        price: '₹29999',
        validity: '60 days',
      },
      {
        type_id :4,
        id: 14,
        title: 'Education Plan',
        description: '10 TB/month, Unlimited calls, 20000 SMS/day, Free educational platforms.',
        price: '₹59999',
        validity: '90 days',
      },
      {
        type_id :4,
        id: 15,
        title: 'Healthcare Plan',
        description: '20 TB/month, Unlimited calls, 50000 SMS/day, Free telemedicine services',
        price: '₹99999',
        validity: '30 days',
      },
      {
        type_id :4,
        id: 16,
        title: 'Smart City Plan',
        description: 'Unlimited data, Unlimited calls and SMS, Free IoT solutions',
        price: '₹149999',
        validity: '30 days',
      }
    ]
  };

  const handleSelect = (plan) => {

    const isLoggedIn = !!localStorage.getItem('user');

    // Navigate to PlanConfirmation page with plan details
    if (isLoggedIn) {
      // If the user is logged in, navigate to PlanConfirmation
      const userId = localStorage.getItem('userId');
      
      if(customerType !==plan.type_id){
        alert("You can't select this plan as it doesn't match your registered category!");
        return;
      }
      navigate('/plan-confirmation', { state: { plan } });

    } else {
      // If the user is not logged in, show a message and redirect to the AuthPage
      alert('Please register/login before selecting a plan. Redirecting...');
      setTimeout(() => {
        navigate('/auth'); // Redirect to the AuthPage after the message
      }, 1000); // Delay the redirection slightly to show the alert
    }
  };
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(()=>{
    const searchParams=new URLSearchParams(location.search);
    const category=searchParams.get('category');
    
    if(category){
      scrollToSection(category);
    }
  },[location]);

  return (
    <div className="airtel-plans">
      
      <nav className="navbar-plans">
        <ul>
          <li onClick={() => scrollToSection('Personal')}>Personal Plans</li>
          <li onClick={() => scrollToSection('Business')}>Business Plans</li>
          <li onClick={() => scrollToSection('Enterprise')}>Enterprise Plans</li>
          <li onClick={() => scrollToSection('Government')}>Government Plans</li>
        </ul>
      </nav>

      {Object.keys(plans).map((category, catIndex) => (
        <div id={category} className="plan-section1" key={catIndex}>
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Plans</h2>
          <div className="plans-row">
            {plans[category].map((plan, index) => (
              <div key={index} className="plan-card1">
                <h2 style={{color:'white'}}>{plan.price}</h2>
                <h3>{plan.title}</h3>
                <p>{plan.description}</p>
                <p>{plan.validity}</p>
                <button className="select-button" onClick={()=> handleSelect(plan)}>Select</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Plans;



*/










