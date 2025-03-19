import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import UserDashboard from './UserDashboard';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ToastContainer } from 'react-toastify';
import api from '../api'; // Ensure this import matches your actual api import

const mockStore = configureStore([]);
const mockAxios = new MockAdapter(axios);

describe('UserDashboard Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      auth: {
        userInfo: {
          user: {
            _id: 'user123',
          },
        },
      },
    });

    store.dispatch = jest.fn();

    mockAxios.onGet(api.products).reply(200, {
      data: [
        {
          _id: 'product1',
          name: 'Product 1',
          description: 'Description 1',
          category: 'Category 1',
          price: 100,
          stock: 10,
          imageUrl: 'image1.jpg',
        },
        {
          _id: 'product2',
          name: 'Product 2',
          description: 'Description 2',
          category: 'Category 2',
          price: 200,
          stock: 20,
          imageUrl: 'image2.jpg',
        },
      ],
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('renders products after fetching', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserDashboard />
          <ToastContainer />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('filters products based on search term', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserDashboard />
          <ToastContainer />
        </Router>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
    });
  });

  it('handles add to cart', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserDashboard />
          <ToastContainer />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const addToCartButton = screen.getAllByText('Add to Cart')[0];
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(screen.getByText('Added to cart')).toBeInTheDocument();
    });

    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('handles add to wishlist', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserDashboard />
          <ToastContainer />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const addToWishlistButtons = screen.getAllByTitle('Add to wishlist');
    fireEvent.click(addToWishlistButtons[0]);

    await waitFor(() => {
        expect(screen.getByText('Added to wishlist')).toBeInTheDocument();
    });

    expect(store.dispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});