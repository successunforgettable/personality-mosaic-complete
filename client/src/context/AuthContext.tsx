import React, { createContext, useState, useContext, useEffect, ReactNode, useRef, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define the user type
export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}

// Session timeout constants
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const SESSION_CHECK_INTERVAL_MS = 60 * 1000; // Check every minute

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
  migrateGuestData: (guestId: string) => Promise<boolean>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  resetSessionTimer: () => void; // Reset inactivity timer
  sessionTimeRemaining: number; // Time remaining in session (ms)
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
  migrateGuestData: async () => false,
  sendPasswordResetEmail: async () => false,
  resetSessionTimer: () => {},
  sessionTimeRemaining: SESSION_TIMEOUT_MS,
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
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number>(SESSION_TIMEOUT_MS);
  
  // Refs for session management
  const lastActivityRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Toast for user notifications
  const { toast } = useToast();

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
    // Create a guest user with minimal information
    const guestUser: User = {
      id: 'guest_' + Math.random().toString(36).substring(2, 9),
      email: 'guest@example.com'
    };
    
    // Set both guest flag and user data
    setIsGuest(true);
    setUser(guestUser);
    
    // Store in localStorage to maintain session
    localStorage.setItem('guest_session', 'true');
    localStorage.setItem('guest_user', JSON.stringify(guestUser));
    
    console.log('Guest session started successfully');
  };

  const endGuestSession = () => {
    setIsGuest(false);
    localStorage.removeItem('guest_session');
    // Clear any guest data
    localStorage.removeItem('guest_assessment_data');
  };

  // Check auth status on mount
  // Session timeout management functions
  const resetSessionTimer = () => {
    // Update last activity timestamp
    lastActivityRef.current = Date.now();
    setSessionTimeRemaining(SESSION_TIMEOUT_MS);
    
    // Clear any existing timeout
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Only set timer if user is authenticated and not a guest
    if (user && !isGuest) {
      timerRef.current = setTimeout(checkSessionTimeout, SESSION_CHECK_INTERVAL_MS);
    }
  };
  
  // Check if session has timed out
  const checkSessionTimeout = () => {
    if (!user || isGuest) return; // No need to check if not logged in
    
    const currentTime = Date.now();
    const lastActivity = lastActivityRef.current;
    const timeElapsed = currentTime - lastActivity;
    
    // Calculate time remaining
    const timeRemaining = Math.max(0, SESSION_TIMEOUT_MS - timeElapsed);
    setSessionTimeRemaining(timeRemaining);
    
    if (timeRemaining <= 0) {
      // Session expired, log out user
      console.log('Session expired due to inactivity');
      toast({
        title: "Session expired",
        description: "You have been logged out due to inactivity",
        variant: "destructive"
      });
      logout();
    } else {
      // Continue checking
      timerRef.current = setTimeout(checkSessionTimeout, SESSION_CHECK_INTERVAL_MS);
    }
  };
  
  // Set up event listeners for user activity
  useEffect(() => {
    // Only track activity if user is logged in and not a guest
    if (user && !isGuest) {
      // Reset timer on initial login
      resetSessionTimer();
      
      // User activity events
      const userActivityEvents = ['mousedown', 'keydown', 'touchstart', 'scroll'];
      
      // Event handler to update last activity time
      const handleUserActivity = () => {
        resetSessionTimer();
      };
      
      // Add event listeners
      userActivityEvents.forEach(event => {
        window.addEventListener(event, handleUserActivity);
      });
      
      // Clear event listeners on cleanup
      return () => {
        userActivityEvents.forEach(event => {
          window.removeEventListener(event, handleUserActivity);
        });
        
        // Clear timeout on unmount
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [user, isGuest]);

  // Automatic check and migration for guest assessment data
  const checkForGuestData = useCallback(async () => {
    if (!user || isGuest) return;
    
    const guestUser = localStorage.getItem('guest_user');
    if (!guestUser) return;
    
    try {
      const parsedGuestUser = JSON.parse(guestUser);
      const guestId = parsedGuestUser.id;
      
      if (guestId && guestId.startsWith('guest_')) {
        console.log('Found previous guest assessment data to migrate');
        const success = await migrateGuestData(guestId);
        
        if (success) {
          // Redirect to results page if there was any data migrated
          const migrationCount = localStorage.getItem('migrated_count');
          if (migrationCount && parseInt(migrationCount) > 0) {
            console.log('Redirecting to results page after migration');
            
            // Short delay to ensure toast is shown before redirect
            setTimeout(() => {
              window.location.href = '/results';
            }, 1000);
          }
        }
      }
    } catch (e) {
      console.error('Error checking for guest assessment data:', e);
    }
  }, [user, isGuest]);

  // Initial authentication check
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
  
  // Effect to automatically check for guest data after successful login
  useEffect(() => {
    if (user && !isGuest) {
      checkForGuestData();
    }
  }, [user, isGuest, checkForGuestData]);

  // Implementation of guest data migration
  const migrateGuestData = async (guestId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check that user is authenticated but not a guest
      if (!user || isGuest) {
        setError("You must be logged in to a registered account to migrate data");
        return false;
      }
      
      // Call the migration endpoint
      const response = await fetch('/api/auth/migrate-guest-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ guestId })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || "Failed to migrate guest data");
        return false;
      }
      
      console.log(`Successfully migrated ${data.migratedCount} items from guest account`);
      
      if (data.migratedCount > 0) {
        toast({
          title: "Assessment data transferred",
          description: `${data.migratedCount} assessment results have been transferred to your account`,
          variant: "default"
        });
        
        // Store a flag to indicate successful migration with results
        localStorage.setItem('assessment_migrated', 'true');
        localStorage.setItem('migrated_count', data.migratedCount.toString());
      }
      
      // Clear any stored guest ID to prevent repeated migrations
      localStorage.removeItem('guest_user');
      localStorage.removeItem('guest_session');
      
      return true;
    } catch (error) {
      console.error("Error migrating guest data:", error);
      setError("An error occurred while migrating guest data");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

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
        migrateGuestData,
        sendPasswordResetEmail,
        resetSessionTimer,
        sessionTimeRemaining,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);