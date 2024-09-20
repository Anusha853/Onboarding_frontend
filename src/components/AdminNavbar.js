import React from 'react';
import '../styles/AdminNavbar.css'; // Custom CSS for styling
import logo from '../assets/images/logo.png';

const AdminNavbar = ({ onTabChange, activeTab }) => {
  return (
    <nav className="admin-navbar">
      <div className="logo">
        <img src={logo} alt="Unitel Logo" />
      </div>
      <div className="admin-nav-options">
        <button 
          className={activeTab === 'customer' ? 'active' : ''}
          onClick={() => onTabChange('customer')}>
          Customer details
        </button>
        <button 
          className={activeTab === 'verification' ? 'active' : ''}
          onClick={() => onTabChange('verification')}>
          Document Verification Log
        </button>
      </div>
      <div className="admin-greeting">
        <span>Hello, admin</span>
        <i className="fas fa-user"></i> {/* Profile icon */}
        <i className="fas fa-check-circle blue-tick"></i> {/* Blue tick icon */}
      </div>
    </nav>
  );
};

export default AdminNavbar;



/*import React from 'react';
import '../styles/AdminNavbar.css'; // Custom CSS for styling
import logo from '../assets/images/logo.png';
//import '@fortawesome/fontawesome-free/css/all.min.css';


const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="logo">
        <img src={logo} alt="Unitel Logo" />
      </div>
      <div className="admin-greeting">
        <span>Hello, admin</span>
        
        <i className="fas fa-user"></i> 
      </div>
    </nav>
  );
};

export default AdminNavbar;*/
