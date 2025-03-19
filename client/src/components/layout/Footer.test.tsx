import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
    it('renders Footer component', () => {
        render(<Footer />);
        expect(screen.getByText(/© 2025 Health Care, All rights reserved/i)).toBeInTheDocument();
        expect(screen.getByText(/v.0.0.1/i)).toBeInTheDocument();
    });
});