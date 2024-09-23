import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage'; // Adjust the import path as necessary

describe('HomePage', () => {
  test('renders the homepage with a welcome message and button', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Check for the welcome message
    const welcomeMessage = screen.getByText(/welcome to our application/i);
    expect(welcomeMessage).toBeInTheDocument();

    // Check for the Sign In / Sign Up button
    const button = screen.getByRole('button', { name: /sign in \/ sign up/i });
    expect(button).toBeInTheDocument();
  });

  test('navigates to the auth page when the button is clicked', () => {
    // Create a mock Auth component to test navigation
    const MockAuth = () => <div>Auth Page</div>;

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<MockAuth />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the button
    const button = screen.getByRole('button', { name: /sign in \/ sign up/i });
    fireEvent.click(button);

    // Check if we are redirected to the Auth page
    const authMessage = screen.getByText(/auth page/i);
    expect(authMessage).toBeInTheDocument();
  });
});
