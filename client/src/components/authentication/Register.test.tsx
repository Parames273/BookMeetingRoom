import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

describe('Register Component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Register />
                <ToastContainer />
            </BrowserRouter>
        );
    });

    it('renders Register component', () => {
        const heading = screen.getByRole('heading', { name: /Register/i });
        expect(heading).toBeInTheDocument();
    });
    it("should render register component", () => {
        render(
            <BrowserRouter>
                <Register />
                <ToastContainer />
            </BrowserRouter>
        );
        expect(screen.getByLabelText(/User Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    });

    it('initial form state', () => {
        expect(screen.getByPlaceholderText(/Enter User Name/i)).toHaveValue('');
        expect(screen.getByPlaceholderText(/example@gmail.com/i)).toHaveValue('');
        expect(screen.getByPlaceholderText(/Enter Phone Number/i)).toHaveValue('');
        expect(screen.getByPlaceholderText(/Enter Password/i)).toHaveValue('');
        expect(screen.getByPlaceholderText(/Confirm Password/i)).toHaveValue('');
        expect(screen.getByLabelText(/Gender/i)).toHaveValue('');
    });

    test('form submission with valid data', async () => {
        (axios.post as jest.Mock).mockResolvedValue({ status: 201 });

        fireEvent.change(screen.getByPlaceholderText(/Enter User Name/i), { target: { value: 'JohnDoe' } });
        fireEvent.change(screen.getByPlaceholderText(/example@gmail.com/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Phone Number/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });

        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(screen.getByText(/Registered Successfully/i)).toBeInTheDocument();
        });
    });

    test('API error handling', async () => {
        (axios.post as jest.Mock).mockRejectedValue({ response: { data: { message: 'Registration failed' } } });

        fireEvent.change(screen.getByPlaceholderText(/Enter User Name/i), { target: { value: 'JohnDoe' } });
        fireEvent.change(screen.getByPlaceholderText(/example@gmail.com/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Phone Number/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });

        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
        });
    });
});