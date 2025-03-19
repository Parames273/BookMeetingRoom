import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthWrapper from './AuthWrapper';

describe('AuthWrapper Component', () => {
  it('renders the navbar and children correctly', () => {
    render(
      <AuthWrapper>
        <div>Test Child Component</div>
      </AuthWrapper>
    );

    // Check if the navbar text is rendered
    expect(screen.getByText('Book Meeting Room')).toBeInTheDocument();

    // Check if the child component is rendered
    expect(screen.getByText('Test Child Component')).toBeInTheDocument();
  });
});