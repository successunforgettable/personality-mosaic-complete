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
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  register: (email: string, fullName: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
  error: string | null;
  isGuest: boolean;
  startGuestSession: () => void;
  endGuestSession: () => void;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  checkAuthStatus: async () => false,
  error: null,
  isGuest: false,
  startGuestSession: () => {},
  endGuestSession: () => {},
  sendPasswordResetEmail: async () => false,
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
      
      // Get token from localStorage
      const token = localStorage.getItem('auth_token');
      
      // If no token, try to get cached user data (for backward compatibility)
      if (!token) {
        const storedUser = localStorage.getItem('auth_user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          return true;
        }
        
        // No auth data found
        setUser(null);
        return false;
      }
      
      // With a token, verify it with the server
      const response = await fetch('/api/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
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

  // Email/password login function
  const login = async (email: string, password: string, remember: boolean = false): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // Make the actual login request to the backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // If login failed
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid email or password');
        return false;
      }

      // Parse the response data
      const { user, token } = await response.json();

      // Set the authentication token in localStorage
      if (token) {
        // Always store the token to maintain the session
        localStorage.setItem('auth_token', token);
        
        // Store user data if remember me is checked
        if (remember) {
          localStorage.setItem('auth_user', JSON.stringify(user));
        }
      }

      // Set the user in state
      setUser(user);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register a new user function
  const register = async (email: string, fullName: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Split full name into first name and last name
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      
      // Make the actual registration request to the backend
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName
        }),
      });
      
      // If registration failed
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed. Please try again.');
        return false;
      }
      
      // Parse the response data
      const { user, token } = await response.json();
      
      // Set the authentication token in localStorage
      if (token) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
      }
      
      // Set the user in state
      setUser(user);
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Password reset email function
  const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // For demonstration purposes, we're implementing a mock password reset
      // In a real app, this would be an API call to your password reset endpoint
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Always return success for demo purposes
      return true;
    } catch (error) {
      console.error('Password reset failed:', error);
      setError('Password reset failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function - clears state and local storage
  const logout = () => {
    try {
      // Clear local state
      setUser(null);
      setIsGuest(false);
      
      // Clear localStorage
      localStorage.removeItem('auth_user');
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
      // First check for saved user in localStorage (if "remember me" was checked)
      const savedUser = localStorage.getItem('auth_user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          // If we have a saved user, we're not in guest mode
          setIsGuest(false);
          // Remove any guest session flag to avoid conflicts
          localStorage.removeItem('guest_session');
        } catch (e) {
          console.error('Failed to parse saved user:', e);
          localStorage.removeItem('auth_user');
        }
      } else {
        // Only try API if no local user found
        await checkAuthStatus();
        
        // Only check for guest session if not authenticated
        if (!user) {
          // Check for guest session in localStorage
          const guestSession = localStorage.getItem('guest_session');
          if (guestSession === 'true') {
            setIsGuest(true);
          }
        }
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
        register,
        logout,
        checkAuthStatus,
        error,
        isGuest,
        startGuestSession,
        endGuestSession,
        sendPasswordResetEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);