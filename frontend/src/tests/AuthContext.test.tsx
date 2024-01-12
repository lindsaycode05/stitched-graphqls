/* eslint-disable testing-library/prefer-screen-queries */
// This test ensures AuthContext behaves as expected
import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const TestComponent = () => {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => handleLogin('test', 'test')}>Login</button>
      )}
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should allow a user to log in and log out', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: 'mock-token' }));

    const { getByText } = render(
      <Router>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </Router>
    );

    act(() => {
      getByText('Login').click();
    });

    await waitFor(() => {
      expect(getByText('Logout')).toBeInTheDocument();
    });

    act(() => {
      getByText('Logout').click();
    });

    await waitFor(() => {
      expect(getByText('Login')).toBeInTheDocument();
    });
  });
});
