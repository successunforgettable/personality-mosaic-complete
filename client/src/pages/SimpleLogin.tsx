import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function SimpleLogin() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { login } = useAuth();
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Error state
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  
  // Debug logs for tracking component lifecycle and state
  useEffect(() => {
    console.log("Login component mounted");
    
    // Cleanup function
    return () => {
      console.log("Login component unmounted");
    };
  }, []);
  
  // Debug log for state changes
  useEffect(() => {
    console.log("Form state updated:", { email, password, isLoading, errors });
  }, [email, password, isLoading, errors]);
  
  // Clear errors when inputs change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Email changed:", e.target.value);
    setEmail(e.target.value);
    
    // Only clear validation after first submission attempt
    if (formSubmitted) {
      setErrors(prev => ({ ...prev, email: undefined, general: undefined }));
    }
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Password changed");
    setPassword(e.target.value);
    
    // Only clear validation after first submission attempt
    if (formSubmitted) {
      setErrors(prev => ({ ...prev, password: undefined, general: undefined }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    console.log("Validating form");
    const newErrors: typeof errors = {};
    let isValid = true;
    
    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    
    console.log("Validation result:", { isValid, newErrors });
    setErrors(newErrors);
    return isValid;
  };
  
  // Reset form state
  const resetForm = () => {
    console.log("Resetting form");
    setEmail("");
    setPassword("");
    setErrors({});
    setFormSubmitted(false);
    
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Form submission started");
    e.preventDefault();
    setFormSubmitted(true);
    
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
    
    console.log("Form validation passed, proceeding with login");
    setIsLoading(true);
    
    try {
      console.log("Sending login request");
      // Send login request to backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          remember: rememberMe
        }),
      });
      
      console.log("Login response received:", response.status);
      
      // If login failed
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login error response:", errorData);
        throw new Error(errorData.message || 'Login failed');
      }
      
      // Login successful
      const data = await response.json();
      console.log("Login successful, user data received");
      
      // Store token in localStorage if remember me is checked
      localStorage.setItem('auth_token', data.token);
      
      // Store user data
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });
      
      // Reset form after successful login
      resetForm();
      
      // Redirect to home page
      console.log("Redirecting to home page");
      setLocation("/");
    } catch (error: any) {
      console.error("Login error:", error);
      setErrors({
        general: error.message || "Login failed. Please check your credentials and try again."
      });
      
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      console.log("Login process completed, setting loading to false");
      setIsLoading(false);
    }
  };
  
  // Handle guest login
  const handleGuestLogin = () => {
    // Store guest flag in localStorage
    localStorage.setItem('guest_session', 'true');
    
    toast({
      title: "Guest access",
      description: "You're now browsing as a guest. Your assessment results won't be saved.",
    });
    
    // Redirect to assessment page
    setLocation("/assessment");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f1f5f9] to-[#ede9fe] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* General error message */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {errors.general}
              </div>
            )}
            
            {/* Email field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="you@example.com"
                disabled={isLoading}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            {/* Password field */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="text-sm">
                  <span className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer">
                    Forgot password?
                  </span>
                </div>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            
            {/* Remember me checkbox */}
            <div className="flex items-center mb-6">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Debug button - only for development */}
            <div className="mt-2 text-right">
              <button
                type="button"
                className="text-xs text-gray-400 hover:text-gray-600"
                onClick={() => console.log("Current form state:", { email, password, rememberMe, errors })}
              >
                Debug form
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleGuestLogin}
                type="button"
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Continue as Guest
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <span
                className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
                onClick={() => setLocation("/signup")}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}