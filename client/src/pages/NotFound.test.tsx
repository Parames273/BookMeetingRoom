import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  test('renders not found message', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    expect(screen.getByText('Page you are looking for does not exists.')).toBeInTheDocument();
  });

  test('renders back to home link', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    const linkElement = screen.getByText('Back to home');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '/');
  });
});