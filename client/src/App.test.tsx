import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({});

describe('App Component', () => {
  it('renders RouteContainer and ToastContainer', () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    // Check if RouteContainer is rendered
    expect(screen.getByTestId('route-container')).toBeInTheDocument();

    // Check if ToastContainer is rendered
    expect(screen.getByText('ToastContainer')).toBeInTheDocument();
  });
});