import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/RegisterPage.css';
 
function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    customerType: '',
  });
 
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
 
    validateField(name, value);
  };
 
  const validateField = (name, value) => {
    let fieldErrors = { ...errors };
 
    switch (name) {
      case 'password':
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        fieldErrors.password = passwordRegex.test(value)
          ? ''
          : 'Password must be 8-15 characters long, include letters, numbers, and special characters.';
        break;
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org)$/;
        fieldErrors.email = emailRegex.test(value)
          ? ''
          : 'Invalid email address. Must end with .com or .org.';
        break;
      case 'phone':
        if (value && !/^\d{10}$/.test(value)) {
          fieldErrors.phone = 'Phone number must be exactly 10 digits.';
        } else {
          fieldErrors.phone = '';
        }
        break;
      default:
        break;
    }
 
    setErrors(fieldErrors);
  };
 
  const validateForm = () => {
    const validationErrors = {};
 
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });
 
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
 
  useEffect(() => {
    const allFieldsFilled =
      formData.username &&
      formData.password &&
      formData.email &&
      formData.phone &&
      formData.customerType;
 
    const noErrors = Object.keys(errors).every((key) => !errors[key]);
 
    setIsFormValid(allFieldsFilled && noErrors);
  }, [formData, errors]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (validateForm()) {
      setIsSubmitting(true);
 
      const customerTypeMap = {
        Personal: 1,
        Business: 2,
        Enterprise: 3,
        Government: 4,
      };
 
      const submissionData = {
        ...formData,
        customerType: customerTypeMap[formData.customerType],
      };
 
      const queryString = new URLSearchParams(submissionData).toString();
 
      try {
        const response = await fetch(
          `http://localhost:7777/user/register?${queryString}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
 
        const text = await response.text();
        console.log('Raw Response Text:', text);
        localStorage.setItem('username', formData.username);
        localStorage.setItem('password', formData.password);
 
        if (response.status === 201) {
          localStorage.setItem(
            'user',
            JSON.stringify({ name: formData.username })
          );
          alert('Registration successful!');
          navigate('/');
        } else {
          alert('Failed to register: ' + text);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert('Please ensure all fields are filled correctly.');
    }
  };
 
  return (
<div className="register-container">
<div className="register-box">
<form onSubmit={handleSubmit}>
<input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
 
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
 
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
 
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
 
          <select
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            required
>
<option value="" disabled>
              Customer Type
</option>
<option value="Personal">Personal</option>
<option value="Business">Business</option>
<option value="Enterprise">Enterprise</option>
<option value="Government">Government</option>
</select>
 
          <button
            type="submit"
            className="register-button"
            style={{ backgroundColor: isFormValid ? '#FFA500' : '#d3d3d3' }} // Grey if form is invalid
            disabled={!isFormValid || isSubmitting}
>
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
</button>
</form>
</div>
</div>
  );
}
 
export default RegisterPage;









/*
import { useNavigate } from 'react-router-dom';
import '../Styles/RegisterPage.css';
 
function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    customerType: '',
  });
 
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
 
    validateField(name, value);
  };
 
  const validateField = (name, value) => {
    let fieldErrors = { ...errors };
 
    switch (name) {
      case 'password':
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        fieldErrors.password = passwordRegex.test(value)
          ? ''
          : 'Password must be 8-15 characters long, include letters, numbers, and special characters.';
        break;
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org)$/;
        fieldErrors.email = emailRegex.test(value)
          ? ''
          : 'Invalid email address. Must end with .com or .org.';
        break;
      case 'phone':
        if (value && !/^\d{10}$/.test(value)) {
          fieldErrors.phone = 'Phone number must be exactly 10 digits.';
        } else {
          fieldErrors.phone = '';
        }
        break;
      default:
        break;
    }
 
    setErrors(fieldErrors);
  };
 
  const validateForm = () => {
    const validationErrors = {};
 
    // Validate each field individually
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });
 
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (validateForm()) {
      setIsSubmitting(true); // Show loading indicator or disable button
 
      // Mapping customerType to numeric value
      const customerTypeMap = {
        Personal: 1,
        Business: 2,
        Enterprise: 3,
        Government: 4,
      };
 
      const submissionData = {
        ...formData,
        customerType: customerTypeMap[formData.customerType],
      };
 
      const queryString = new URLSearchParams(submissionData).toString();
 
      try {
        const response = await fetch(
          `http://localhost:7777/user/register?${queryString}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
 
        const text = await response.text();
        console.log('Raw Response Text:', text);
        localStorage.setItem('username', formData.username);
        localStorage.setItem('password', formData.password);
 
        if (response.status === 201) {
          localStorage.setItem(
            'user',
            JSON.stringify({ name: formData.username })
          );
          alert('Registration successful!');
          navigate('/');
        } else {
          alert('Failed to register: ' + text);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setIsSubmitting(false); // Re-enable button or hide loading indicator
      }
    } else {
      alert('Please fix the errors in the form.');
    }
  };
 
  return (
    <div className="register-container">
      <div className="register-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
 
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
 
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
 
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
 
          <select
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Customer Type
            </option>
            <option value="Personal">Personal</option>
            <option value="Business">Business</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Government">Government</option>
          </select>
 
          <button
            type="submit"
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
 
export default RegisterPage;








/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/RegisterPage.css';
//import Navbar from './Navbar';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    customerType: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    
    // Validate password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (!passwordRegex.test(formData.password)) {
      formErrors.password = "Password must be 8-15 characters long, include letters, numbers, and special characters.";
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org)$/;
    if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email address. Must end with .com or .org.";
    }

    // Validate phone number (optional but must be exactly 10 digits if provided)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      formErrors.phone = "Phone number must be exactly 10 digits.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      setIsSubmitting(true); // Show loading indicator or disable button
  
      // Mapping customerType to numeric value
      const customerTypeMap = {
        'Personal': 1,
        'Business': 2,
        'Enterprise': 3,
        'Government': 4
      };
  
      const submissionData = {
        ...formData,
        customerType: customerTypeMap[formData.customerType],  // Convert customerType to numeric value
      };
  
      // Construct query string manually to ensure all fields are included
      const queryString = new URLSearchParams(submissionData).toString();
  
      try {
        const response = await fetch(`http://localhost:7777/user/register?${queryString}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
         // Get raw response text
      const text = await response.text(); 
      console.log("Raw Response Text:", text);
      localStorage.setItem('username', formData.username);
      localStorage.setItem('password', formData.password);
      

      if (response.status === 201) {

        localStorage.setItem('user', JSON.stringify({ name: formData.username }));
        alert("Registration successful!");
        navigate('/');
        // Redirect To Some other Page
      } else {
        alert("Failed to register: " + text);
      }
      } catch (error) {
        alert(`Error: ${error.message}`);
      } finally {
        setIsSubmitting(false); // Re-enable button or hide loading indicator
      }
      } else {
        alert("Please fix the errors in the form.");
      }
    };
    
    


  return (
    <div>
      
  
    <div className="register-container">
      <div className="register-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
          
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
          
          <select
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Customer Type
            </option>
            <option value="Personal">Personal</option>
            <option value="Business">Business</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Government">Government</option>
          </select>
          
          <button type="submit" className="register-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default RegisterPage;*/