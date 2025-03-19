import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navbar from './Navbar';
import '@testing-library/jest-dom';
import { ToastContainer } from 'react-toastify';

const mockStore = configureStore([]);

describe('Navbar Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            auth: { userInfo: { user: { userName: 'JohnDoe' } } },
            cart: { cart: [], wishlist: [] }
        });

        render(
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <ToastContainer />
                </Router>
            </Provider>
        );
    });

    it('renders Navbar component', () => {
        expect(screen.getByText(/Book Meeting Room/i)).toBeInTheDocument();
    });


    it('profile dropdown', () => {
        const profileButton = screen.getByRole('button', { name: /JohnDoe/i });
        fireEvent.click(profileButton);
        expect(screen.getByRole('button', { name: /Get Orders/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
        fireEvent.click(profileButton);
        expect(screen.queryByRole('button', { name: /Get Orders/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Logout/i })).not.toBeInTheDocument();
    });

    it('navigation links', () => {
        const dashboardLink = screen.getByRole('link', { name: /Book Meeting Room/i });
        fireEvent.click(dashboardLink);
        expect(window.location.pathname).toBe('/dashboard');
    });
});