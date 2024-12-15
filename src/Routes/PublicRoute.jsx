import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation(); 

  // Redirect authenticated users away from public routes like login and signup
  if (isAuthenticated && (location.pathname === '/' || location.pathname === '/signup')) {
    return <Navigate to="/polls" replace />;
  }

  return element;
};

export default PublicRoute;
