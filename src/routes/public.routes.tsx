import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { isAuthenticated } from '@services/auth/authBaseService';

interface PublicRouteProps {
  children: JSX.Element;
}

export default function PublicRoute({ children }: PublicRouteProps) {
 
  return isAuthenticated() ? <Navigate to="/dashboard" /> : children;
}
