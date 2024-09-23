import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ContactUs from '../components/ContactUs';

test('renders ContactUs component without crashing', () => {
  render(<ContactUs />);
  expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
});

test('renders form fields', () => {
  render(<ContactUs />);
  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
});

test('renders submit button', () => {
  render(<ContactUs />);
  const submitButton = screen.getByRole('button', { name: /Submit/i });
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeEnabled();
});

test('allows user to type in Name, Email, and Message fields', () => {
  render(<ContactUs />);

  const nameInput = screen.getByLabelText(/Name/i);
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  expect(nameInput.value).toBe('John Doe');

  const emailInput = screen.getByLabelText(/Email address/i);
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  expect(emailInput.value).toBe('john@example.com');

  const messageInput = screen.getByLabelText(/Message/i);
  fireEvent.change(messageInput, { target: { value: 'Hello there!' } });
  expect(messageInput.value).toBe('Hello there!');
});

test('submitting the form does not cause an error', () => {
  render(<ContactUs />);
  const submitButton = screen.getByRole('button', { name: /Submit/i });
  fireEvent.click(submitButton);
  // Check that the default behavior is prevented or handled correctly.
  // Since there's no specific handling, just ensure it doesn't crash.
  expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
});
