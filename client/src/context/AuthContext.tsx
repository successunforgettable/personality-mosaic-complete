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

  // Email/password login function
  const login = async (email: string, password: string, remember: boolean = false): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // For demonstration purposes, we're implementing a mock authentication
      // In a real app, this would be an API call to your authentication endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login with test credentials
      if (email === 'test@example.com' && password === 'password123') {
        // Create a mock user
        const userData: User = {
          id: '123456',
          email: email,
          firstName: 'Test',
          lastName: 'User',
          profileImageUrl: 'https://ui-avatars.com/api/?name=Test+User&background=7c3aed&color=fff'
        };
        
        // Set the user in state
        setUser(userData);
        
        // Store in localStorage if remember me is checked
        if (remember) {
          localStorage.setItem('auth_user', JSON.stringify(userData));
        }
        
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
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
      
      // For demonstration purposes, we're implementing a mock registration
      // In a real app, this would be an API call to your registration endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock user based on registration data
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      
      const userData: User = {
        id: 'reg_' + Math.random().toString(36).substring(2, 9),
        email: email,
        firstName: firstName,
        lastName: lastName,
        profileImageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=7c3aed&color=fff`
      };
      
      // Set the user in state
      setUser(userData);
      
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
        } catch (e) {
          console.error('Failed to parse saved user:', e);
          localStorage.removeItem('auth_user');
        }
      } else {
        // Only try API if no local user found
        await checkAuthStatus();
      }
      
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