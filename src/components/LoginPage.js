

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 
import '../Styles/LoginPage.css';
 
const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(username.trim() === '' || password.trim() === '');
  }, [username, password]);
 
 
 
    const handleInputChange = async (e) => {
        e.preventDefault();

        // Check if username and password are both "admin"
          if (username === 'admin' && password === 'admin') {
            // Redirect to AdminDashboard
            navigate('/admin-dashboard');
            // localStorage.setItem('user', JSON.stringify({ name: username }));
            // localStorage.setItem('username', 'admin');
            // return;
          }
          const response = await fetch(`http://localhost:7777/user/login?username=${username}&password=${password}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
         
           
     
          if (response.ok) {
            const data = await response.json();
            // Handle successful login here (e.g., save token, redirect)
            localStorage.setItem('user', JSON.stringify({ name: username }));
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('customerType', data.customerType);
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            alert("Success full Login")
            console.log('Login successful:', data);
            navigate('/');
           
           
          }
           
          else{
            
            alert('Login failed!');
            console.error('Login failed');
          }
       
    };
 
    return (
      <div className="login-container">
      <div className="login-box">
            <form onSubmit={handleInputChange}>
            <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
                <button type="submit"  className="login-button"
                disabled={isButtonDisabled}
                style={{ backgroundColor: isButtonDisabled ? '#d3d3d3' : '#FFA500' }}
                >
                  SignIn</button>
            </form>
            </div>
            </div>
    );
};
 
export default LoginPage;

/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = async (e) => {
    e.preventDefault();
  
    // Check if username and password are both "admin"
    if (username === 'admin' && password === 'admin') {
      // Redirect to AdminDashboard
      navigate('/admin-dashboard');
      return;
    }
  
    // Handle login for other users
    try {
      const response = await fetch('http://localhost:7777/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      // Check if response is OK
      if (response.ok) {
        const data = await response.json();
        // Handle successful login here (e.g., save token, redirect)
        localStorage.setItem('user', JSON.stringify({ name: username }));
        alert("Successful Login");
        console.log('Login successful:', data);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        navigate('/'); // Redirect to home page or another route
      } else {
        // If not OK, log the response status and error
        const errorData = await response.json();
        console.error('Login failed:', response.status, errorData);
        alert(`Login failed: ${errorData.message || 'Invalid credentials'}`);
      }
    } catch (error) {
      console.error('Error during login request:', error);
      alert("An error occurred during login.");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleInputChange}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;*/