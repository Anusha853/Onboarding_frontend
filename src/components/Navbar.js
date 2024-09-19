import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logo.png';
import { isLoggedIn } from './AuthPage';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user ? user.name : '';
    const navigate=useNavigate();
    const handlePlansClick = () => {
        console.log("Login"+isLoggedIn())
        if (isLoggedIn()) {
            navigate('/plans');  // Redirect to Plans page if logged in
        } else {
            navigate('/total-plans');  // Redirect to TotalPlans if not logged in
        }
    };
    // const handleLogout = () => {
    //     localStorage.removeItem('user');
    //     navigate('/'); // Redirect to homepage after logout
    // };
    

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <Link to="/" className="navbar-brand">
                <img src={logo} alt="UniTel Logo" className="navbar-logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="./">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={handlePlansClick}>Plans</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/contact-us">Contact Us</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-nav ml-auto pr-3 d-flex align-items-center">
                {user ? (
                    <>
                        <span className="nav-link">Hello, {username}</span>
                        
                        <Link className="nav-link" to="/profile">
                            <i className="fas fa-user"></i> {/* Profile icon */}
                        </Link>
                    </>
                ) : (
                    <Link className="nav-link btn btn-warning sign-up-btn" to="/auth">Sign In / Sign Up</Link>
                )}
                {/* Log out button
        <button className="logout-button" onClick={handleLogout}>Log out</button> */}
            </div>
        </nav>
    );
}

export default Navbar;






/*import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user ? user.name : '';
    const navigate=useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/'); // Redirect to homepage after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-brand" href="./">UniTel</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="./">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/plans">Plans</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/contact-us">Contact Us</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-nav ml-auto pr-3 d-flex align-items-center">
                {user ? (
                    <>
                        <span className="nav-link">Hello, {username}</span>
                        <span><button onClick={handleLogout}>Logout</button></span>
                        <Link className="nav-link" to="/profile">
                            <i className="fas fa-user"></i> {/* Profile icon *//*}
                        </Link>
                    </>
                ) : (
                    <Link className="nav-link btn btn-warning sign-up-btn" to="/auth">Sign In / Sign Up</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;*/



//<span className="nav-link"><button onClick={handleLogout}>Logout</button></span>
