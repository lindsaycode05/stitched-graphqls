/* eslint-disable testing-library/prefer-screen-queries */
// This test ensures the main App component and routing work correctly
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

describe('App', () => {
  it('renders LoginPage initially', () => {
    const { getByPlaceholderText } = render(<App />);

    expect(getByPlaceholderText('Username')).toBeInTheDocument();
  });
});
