import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Component', () => {
    it('renders Loader component', () => {
        render(<Loader />);
        expect(screen.getByTestId('loader-svg')).toBeInTheDocument();
    });
});