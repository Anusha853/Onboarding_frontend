import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer component', () => {
    test('renders correctly', () => {
        render(<Footer />);
        const footerElement = screen.getByText(/© 2024 UniTel/i);
        expect(footerElement).toBeInTheDocument();
    });

    test('has the correct class name', () => {
        const { container } = render(<Footer />);
        expect(container.firstChild).toHaveClass('footer');
    });

    test('displays the correct year', () => {
        render(<Footer />);
        const footerElement = screen.getByText(/© 2024/i);
        expect(footerElement).toBeInTheDocument();
    });
});
