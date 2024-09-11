import React from 'react';
//import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/images/img1.jpg';

function Header() {
    const navigate = useNavigate(); // Initialize the navigate hook

    const handleGetStartedClick = () => {
    navigate('/auth'); // Navigate to the auth page when button is clicked
  };

    return (
        
        <header className="header text-white text-center">
            
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-lg-10 col-xl-8">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col-md-6 d-flex flex-column justify-content-center">
                                    <div className="card-body mt-4">
                                        <h1 className="card-title">UniTel</h1>
                                        <h2 className="card-subtitle mb-2">Empowering your connections, wherever you are.!</h2>
                                        <br></br>
                                        <p className="card-text">Get the best plans with amazing deals</p>
                                        <p className="card-text">Eligibility criteria apply.</p>
                                        <div className="buttons mt-3">
                                            <button className="btn button-style me-2" onClick={handleGetStartedClick}>Get Started</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <img src={img1} alt="description" className="img-cover " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <h1 className="plan-heading">Our Best Plans</h1>

        </header>
    );
}

export default Header;


//<img src="https://images.pexels.com/photos/3783519/pexels-photo-3783519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Pixel Phone" className="img-cover " />