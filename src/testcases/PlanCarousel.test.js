import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlanCarousel from '../components/PlanCarousel';

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('PlanCarousel component', () => {
    const mockNavigate = jest.fn(); // Create a mock function for navigation
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous calls to the mock function
        require('react-router-dom').useNavigate.mockReturnValue(mockNavigate); // Make useNavigate return the mock function
    });

    test('renders the carousel items', () => {
        render(
            <MemoryRouter>
                <PlanCarousel />
            </MemoryRouter>
        );

        // Check if all the plan titles are rendered
        expect(screen.getByText(/Adventure Enthusiast Plan/i)).toBeInTheDocument();
        expect(screen.getByText(/Startup Booster Plan/i)).toBeInTheDocument();
        expect(screen.getByText(/Innovation Hub Plan/i)).toBeInTheDocument();
        expect(screen.getByText(/Education Plan/i)).toBeInTheDocument();
    });

    test('navigates correctly for other plan categories', () => {
        render(
            <MemoryRouter>
                <PlanCarousel />
            </MemoryRouter>
        );

        const buttons = screen.getAllByRole('button', { name: /See More Plans/i });

        // Click buttons for each plan and assert navigation
        fireEvent.click(buttons[0]); // Startup Booster Plan
        expect(mockNavigate).toHaveBeenCalledWith('/total-plans?category=Personal Plans');

        fireEvent.click(buttons[1]); // Startup Booster Plan
        expect(mockNavigate).toHaveBeenCalledWith('/total-plans?category=Business Plans');

        fireEvent.click(buttons[2]); // Innovation Hub Plan
        expect(mockNavigate).toHaveBeenCalledWith('/total-plans?category=Enterprise Plans');

        fireEvent.click(buttons[3]); // Education Plan
        expect(mockNavigate).toHaveBeenCalledWith('/total-plans?category=Government Plans');
    });
});
