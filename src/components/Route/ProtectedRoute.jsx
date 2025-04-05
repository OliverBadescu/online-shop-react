import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../services/state/userContext';
import { useContext } from 'react';


export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}