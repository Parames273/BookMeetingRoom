import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from './RootLayout';

jest.mock('./Navbar', () => () => <div>Mocked Navbar</div>);
jest.mock('./Footer', () => () => <div>Mocked Footer</div>);

describe('RootLayout Component', () => {
    it('renders RootLayout component', () => {
        render(
            <RootLayout>
                <div>Test Content</div>
            </RootLayout>
        );

        expect(screen.getByText(/Mocked Navbar/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
        expect(screen.getByText(/Mocked Footer/i)).toBeInTheDocument();
    });

    it('renders children content', () => {
        render(
            <RootLayout>
                <div>Another Test Content</div>
            </RootLayout>
        );

        expect(screen.getByText(/Another Test Content/i)).toBeInTheDocument();
    });
});