// ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ADMIN_ID } from '../utils/constantData';

const ProtectedRoute = ({ element, Component, redirectTo = '/', adminOnly = false }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  // Redirect unauthenticated users to login, except if they're on signup
  if (!isAuthenticated && location.pathname !== '/signup') {
    return <Navigate to="/" replace />;
  }

  // Check if the route requires admin access and if the user is an admin
  if (adminOnly && user?.roleId !== ADMIN_ID) {
    return <Navigate to="/unauthorized" replace />; 
  }

  // For authenticated users, render either the `element` or the `Component`
  if (isAuthenticated) {
    return element || (Component && <Component />);
  }

  // Default redirect if none of the conditions above are met
  return <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
