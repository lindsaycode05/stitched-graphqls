import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import { ProtectedRouteProps } from './interfaces';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/main'
              element={<ProtectedRoute component={MainPage} />}
            />
            <Route path='/' element={<RootRoute />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const { isAuthenticated } = useAuth();

  // Render the component if authenticated, otherwise redirect to login
  return isAuthenticated ? <Component /> : <Navigate to='/login' />;
};

const RootRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Navigate to='/main' replace />
  ) : (
    <Navigate to='/login' replace />
  );
};

export default App;
