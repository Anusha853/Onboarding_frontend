

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
            window.location.href = process.env.REACT_APP_ADMIN_URL;
          // Admin app URL
            return;
            // localStorage.setItem('user', JSON.stringify({ name: username }));
            // localStorage.setItem('username', 'admin');
            // return;
          }
          const apiUrl = process.env.REACT_APP_BASE_URL;
          console.log("Base URL:", apiUrl);

          const response = await fetch(`${apiUrl}/user/login?username=${username}&password=${password}`, {
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

