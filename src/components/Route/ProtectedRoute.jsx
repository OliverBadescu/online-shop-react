import React from 'react';
import { Navigate } from 'react-router-dom';
import {userContext} from '../../services/state/userContext.jsx';
import { useContext } from 'react';


export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(userContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}