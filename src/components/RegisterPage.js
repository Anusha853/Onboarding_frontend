import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/RegisterPage.css';
//import { toFormData } from 'axios';
 
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
        const apiUrl = process.env.REACT_APP_BASE_URL;
        const response = await fetch(
          `${apiUrl}/user/register?${queryString}`,
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
        localStorage.setItem('customerType',customerTypeMap[formData.customerType]);
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









