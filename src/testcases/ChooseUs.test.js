import React from 'react';
import { render, screen } from '@testing-library/react';
import ChooseUs from '../components/ChooseUs';

describe('ChooseUs Component', () => {
  test('renders section heading', () => {
    render(<ChooseUs />);
    const heading = screen.getByText(/why choose us/i);
    expect(heading).toBeInTheDocument();
  });
});
