import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthPage from '../components/AuthPage';  // Adjust path as necessary
import RegisterPage from '../components/RegisterPage';
import LoginPage from '../components/LoginPage';

// Mock components to avoid actual rendering and focus on AuthPage
jest.mock('../components/RegisterPage', () => () => <div>Register Page</div>);
jest.mock('../components/LoginPage', () => () => <div>Login Page</div>);

describe('AuthPage Component', () => {
  test('renders RegisterPage by default', () => {
    render(<AuthPage />);
    
    // Assert that RegisterPage is rendered by default
    expect(screen.getByText('Register Page')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  test('renders LoginPage when "Sign In" button is clicked', () => {
    render(<AuthPage />);
    
    // Click the "Sign In" button
    fireEvent.click(screen.getByText('Sign In'));

    // Assert that LoginPage is rendered
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Register Page')).not.toBeInTheDocument();
  });

  test('renders RegisterPage when "Sign Up" button is clicked', () => {
    render(<AuthPage />);
    
    // First click the "Sign In" button to switch to LoginPage
    fireEvent.click(screen.getByText('Sign In'));

    // Now click the "Sign Up" button to switch back to RegisterPage
    fireEvent.click(screen.getByText('Sign Up'));

    // Assert that RegisterPage is rendered
    expect(screen.getByText('Register Page')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  test('checks active tab class', () => {
    render(<AuthPage />);
    
    // Assert that the "Sign Up" tab is active by default
    expect(screen.getByText('Sign Up')).toHaveClass('active-tab');
    expect(screen.getByText('Sign In')).not.toHaveClass('active-tab');

    // Click the "Sign In" button
    fireEvent.click(screen.getByText('Sign In'));

    // Assert that the "Sign In" tab is active
    expect(screen.getByText('Sign In')).toHaveClass('active-tab');
    expect(screen.getByText('Sign Up')).not.toHaveClass('active-tab');
  });
});
