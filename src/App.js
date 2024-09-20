import React, { useState } from 'react';
import AdminNavbar from './components/AdminNavbar';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('customer');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <AdminNavbar onTabChange={handleTabChange} activeTab={activeTab} />
      <AdminDashboard activeTab={activeTab} />
    </div>
  );
};

export default App;



// import logo from './logo.svg';
// import './App.css';
/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from "./components/AdminDashboard";
import AdminNavbar from "./components/AdminNavbar";


function AdminApp() {
  return (
    <div className="App">
      <Router>
      <AdminNavbar />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </Router>
      
    </div>
  );
}

export default AdminApp;*/
