import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../components/RegisterPage';

test('displays phone error for invalid phone number', () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Phone Number/i), { target: { value: '12345' } });
  
  // Since the error message is set in the validation logic,
  // let's ensure that the error appears.
  expect(screen.getByText(/Phone number must be exactly 10 digits/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/Phone Number/i), { target: { value: '1234567890' } });

  // Check that the error message is gone after valid input
  expect(screen.queryByText(/Phone number must be exactly 10 digits/i)).not.toBeInTheDocument();
});
