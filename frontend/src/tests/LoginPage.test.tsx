/* eslint-disable testing-library/prefer-screen-queries */
// This test ensures the LoginPage renders and functions correctly
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import '@testing-library/jest-dom';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('LoginPage', () => {
  it('renders login form and submits credentials', () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </Router>
    );

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Log in');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
  });
});
