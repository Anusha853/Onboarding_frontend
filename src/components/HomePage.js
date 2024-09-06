import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomePage.css'; // Create a new CSS file for homepage styles

function HomePage() {
  const navigate = useNavigate();

  const navigateToAuthPage = () => {
    navigate('/auth'); // useNavigate instead of useHistory
  };

  return (
    <div className="homepage-container">
      <div className="homepage-box">
        <h1>Welcome to Our Application</h1>
        <button className="signin-signup-button" onClick={navigateToAuthPage}>
          Sign In / Sign Up
        </button>
      </div>
    </div>
  );
}

export default HomePage;
