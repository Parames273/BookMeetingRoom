import React from 'react';
import { render, screen } from '@testing-library/react';
import NoData from './NoData';

describe('NoData Component', () => {
    it('renders NoData component', () => {
        render(<NoData message="No data available" />);
        expect(screen.getByText(/No data available/i)).toBeInTheDocument();
    });

    it('displays custom message', () => {
        const customMessage = "Custom no data message";
        render(<NoData message={customMessage} />);
        expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
});