import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the user type
export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
  error: string | null;
  isGuest: boolean;
  startGuestSession: () => void;
  endGuestSession: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  checkAuthStatus: async () => false,
  error: null,
  isGuest: false,
  startGuestSession: () => {},
  endGuestSession: () => {},
});

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Create the auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  // Check if the user is authenticated
  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Login function - redirects to the Replit Auth login page
  const login = () => {
    window.location.href = '/api/login';
  };

  // Logout function - calls the logout API and clears state
  const logout = () => {
    try {
      // Redirect to the logout endpoint
      window.location.href = '/api/logout';
      
      // Clear local state
      setUser(null);
      setIsGuest(false);
      
      // Clear localStorage
      localStorage.removeItem('guest_session');
      localStorage.removeItem('guest_assessment_data');
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Logout failed. Please try again.');
    }
  };

  // Guest mode functions
  const startGuestSession = () => {
    setIsGuest(true);
    localStorage.setItem('guest_session', 'true');
  };

  const endGuestSession = () => {
    setIsGuest(false);
    localStorage.removeItem('guest_session');
    // Clear any guest data
    localStorage.removeItem('guest_assessment_data');
  };

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthStatus();
      
      // Check for guest session in localStorage
      const guestSession = localStorage.getItem('guest_session');
      if (guestSession === 'true') {
        setIsGuest(true);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkAuthStatus,
        error,
        isGuest,
        startGuestSession,
        endGuestSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);