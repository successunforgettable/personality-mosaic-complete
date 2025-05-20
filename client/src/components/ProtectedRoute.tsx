import { ReactNode, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowGuest?: boolean;
}

/**
 * A wrapper component that protects routes requiring authentication
 * Redirects to login if user is not authenticated
 * Can optionally allow guest users
 */
export default function ProtectedRoute({ children, allowGuest = false }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isGuest } = useAuth();
  const [_, navigate] = useLocation();
  const [match] = useRoute('/login');
  
  useEffect(() => {
    // Only redirect if not loading, not authenticated, and not on the login page
    // Also check if guest mode is allowed for this route
    if (!isLoading && !isAuthenticated && !match && !(allowGuest && isGuest)) {
      // Store the current path to redirect back after login
      const returnPath = window.location.pathname;
      if (returnPath !== '/login' && returnPath !== '/signup') {
        sessionStorage.setItem('returnPath', returnPath);
      }
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, match, navigate, allowGuest, isGuest]);
  
  // Show nothing while checking authentication status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7c3aed]"></div>
      </div>
    );
  }
  
  // Show content if authenticated or if guest mode is allowed and guest is active
  if (isAuthenticated || (allowGuest && isGuest)) {
    return <>{children}</>;
  }
  
  // Fallback - should not generally reach here due to redirect in useEffect
  return null;
}