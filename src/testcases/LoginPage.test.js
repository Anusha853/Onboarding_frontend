import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../components/LoginPage';

describe('LoginPage Component', () => {
  test('renders login form', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    // Check if the input fields and button are rendered
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('SignIn')).toBeInTheDocument();
  });
});
