import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, AuthProviderProps } from '../interfaces';

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  handleLogin: async () => {},
  handleLogout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token'))
  );

  const handleLogin = async (username: string, password: string) => {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      navigate('/main');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
