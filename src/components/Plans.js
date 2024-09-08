import React, { useEffect } from 'react';
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














/*import React, { useEffect } from 'react';
import  { useState } from 'react';
import '../Styles/AirtelPlans.css';
//import Navbar from './Navbar';
import { useLocation,useNavigate } from 'react-router-dom';

function Plans() {
  const navigate = useNavigate();
  const location=useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const plans = {
    Personal: [
      {
        id: 1,
        title: 'Social Media Enthusiast Plan',
        description: '5 GB/day for social media, Unlimited calls, 100 SMS/day',
        price: '₹299',
        validity: '60 days',
      },
      {
        id: 3,
        title: 'Health&Fitness Plan',
        description: '50 GB/month, Unlimited calls, 100 SMS/day, Free fitness apps',
        price: '₹499',
        validity: '30 days',
      },
      {
        id: 2,
        title: 'Gamers Paradise Plan',
        description: '100 GB/month for gaming, 500 minutes calls, 50 SMS/day',
        price: '₹799',
        validity: '90 days',
      },
      {
        id: 4,
        title: 'Travel Lovers Plan',
        description: '10 GB/month with roaming, Unlimited calls, 100 minutes international, 100 SMS/day',
        price: '₹999',
        validity: '30 days',
      }
    ],
    Business: [
      {
        id: 5,
        title: 'Startup Booster Plan',
        description: '200 GB/month, Unlimited calls, 1000 SMS/day, Free business tools',
        price: '₹2999',
        validity: '60 days',
      },
      {
        id: 6,
        title: 'Remote Work Plan',
        description: '500 GB/month, Unlimited calls, 2000 SMS/day, Free VPN and cloud storage',
        price: '₹4999',
        validity: '90 days',
      },
      {
        id: 7,
        title: 'Customer Engagement Plan',
        description: '1 TB/month, Unlimited calls, 5000 SMS/day, Free CRM tools.',
        price: '₹9999',
        validity: '30 days',
      },
      {
        id: 8,
        title: 'E-commerce Plan',
        description: '2 TB/month, Unlimited calls, 10000 SMS/day, Free e-commerce tools',
        price: '₹19999',
        validity: '30 days',
      }
    ],
    Enterprise: [
      {
        id: 9,
        title: 'Data-Driven Enterprise Plan',
        description: '10 TB/month, Unlimited calls, 20000 SMS/day, Free analytics tools',
        price: '₹49999',
        validity: '60 days',
      },
      {
        id: 10,
        title: 'Global Connectivity Plan',
        description: '20 TB/month, Unlimited calls, 1000 minutes international, 50000 SMS/day',
        price: '₹99999',
        validity: '90 days',
      },
      {
        id: 11,
        title: 'Innovation Hub Plan',
        description: '50 TB/month, Unlimited calls, 100000 SMS/day, Free R&D support',
        price: '₹199999',
        validity: '30 days',
      },
      {
        id: 12,
        title: 'Sustainability Plan',
        description: '100 TB/month, Unlimited calls and SMS, Free sustainability consulting',
        price: '₹299999',
        validity: '30 days',
      }
    ],
    Government: [
      {
        id: 13,
        title: 'Public Safety Plan',
        description: '5 TB/month, Unlimited calls, 10000 SMS/day, Priority access in emergencies',
        price: '₹29999',
        validity: '60 days',
      },
      {
        id: 14,
        title: 'Education Plan',
        description: '10 TB/month, Unlimited calls, 20000 SMS/day, Free educational platforms.',
        price: '₹59999',
        validity: '90 days',
      },
      {
        id: 15,
        title: 'Healthcare Plan',
        description: '20 TB/month, Unlimited calls, 50000 SMS/day, Free telemedicine services',
        price: '₹99999',
        validity: '30 days',
      },
      {
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
