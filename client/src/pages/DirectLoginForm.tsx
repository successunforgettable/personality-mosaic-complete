import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

/**
 * A simplified login form specifically designed to fix form submission issues
 */
export default function DirectLoginForm() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };
  
  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };
  
  // Handle form submission - implemented with explicit button click handler
  // to avoid form submission issues
  const handleLoginClick = async () => {
    // Validate inputs
    if (!email.trim()) {
      setErrorMessage("Email is required");
      return;
    }
    
    if (!password) {
      setErrorMessage("Password is required");
      return;
    }
    
    // Set loading state
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
          password
        }),
      });
      
      console.log("Login response status:", response.status);
      
      // If login failed
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login error response:", errorData);
        throw new Error(errorData.message || 'Login failed');
      }
      
      // Login successful
      const data = await response.json();
      console.log("Login successful");
      
      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);
      
      // Store user data
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });
      
      // Reset form
      setEmail("");
      setPassword("");
      setErrorMessage("");
      
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Redirect to home page
      setLocation("/");
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(error.message || "Login failed. Please check your credentials.");
      
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle guest login
  const handleGuestAccess = () => {
    localStorage.setItem('guest_session', 'true');
    toast({
      title: "Guest access",
      description: "You're now browsing as a guest. Your assessment results won't be saved.",
    });
    setLocation("/assessment");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-purple-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
            {/* Error message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {errorMessage}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
                disabled={isLoading}
              />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
            
            {/* Submit button - using onClick instead of form submission */}
            <button
              type="button"
              onClick={handleLoginClick}
              disabled={isLoading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
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
                onClick={handleGuestAccess}
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