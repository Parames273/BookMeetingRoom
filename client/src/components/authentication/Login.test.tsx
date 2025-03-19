import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter as Router, useNavigate, Link } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from './Login';
import { ToastContainer, toast } from 'react-toastify';
import { LOGIN_REQUEST } from '../../constants';

const mockStore = configureStore([]);
const store = mockStore({
  auth: { userInfo: { user: { _id: 'user123' } } },
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn((selector) => selector(store.getState())),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Link: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
  ToastContainer: jest.fn(() => <div>ToastContainer</div>),
}));

describe('Login Component', () => {
  it('renders login form and handles form submission', async () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();
    const mockToastError = jest.fn();
    const mockToastSuccess = jest.fn();

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (toast.error as jest.Mock).mockImplementation(mockToastError);
    (toast.success as jest.Mock).mockImplementation(mockToastSuccess);

    render(
        <>
          <Login />
          <ToastContainer />
        </>
    );

    // Check if the form fields are rendered
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button',{ name: /Login/i}));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: LOGIN_REQUEST,
        payload: {
          credentials: { email: 'test@example.com', password: 'password123' },
          callBack: expect.any(Function),
        },
      });
    });

    // Simulate callback with error
    const callBack = mockDispatch.mock.calls[0][0].payload.callBack;
    callBack(false, { status: 401, response: { data: { message: 'Wrong Credentials..' } } });

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith('Wrong Credentials..');
      expect(screen.getByText('Wrong Credentials..')).toBeInTheDocument();
    });
  });
});