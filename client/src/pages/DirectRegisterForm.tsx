import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

/**
 * A simplified registration form with direct submission handling
 */
export default function DirectRegisterForm() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Handle input changes
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setErrorMessage("");
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };
  
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setErrorMessage("");
  };
  
  // Handle registration - implemented with explicit button click
  const handleRegisterClick = async () => {
    // Validate inputs
    if (!username.trim()) {
      setErrorMessage("Username is required");
      return;
    }
    
    if (username.length < 3) {
      setErrorMessage("Username must be at least 3 characters");
      return;
    }
    
    if (!email.trim()) {
      setErrorMessage("Email is required");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }
    
    if (!password) {
      setErrorMessage("Password is required");
      return;
    }
    
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    try {
      console.log("Sending registration request");
      
      // Send registration request to backend
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      
      console.log("Registration response status:", response.status);
      
      // Handle errors
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration error response:", errorData);
        throw new Error(errorData.message || 'Registration failed');
      }
      
      // Registration successful
      const data = await response.json();
      console.log("Registration successful");
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      
      // Reset form
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrorMessage("");
      
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Redirect to login page
      setLocation("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      setErrorMessage(error.message || "Registration failed. Please try again.");
      
      toast({
        title: "Registration failed",
        description: error.message || "There was a problem creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-purple-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="text-gray-600 mt-2">Sign up to take the Personality Mosaic assessment</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
            {/* Error message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {errorMessage}
              </div>
            )}
            
            {/* Username field */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="johndoe"
                disabled={isLoading}
              />
            </div>
            
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
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
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
            
            {/* Confirm Password field */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
            
            {/* Submit button - using onClick instead of form submission */}
            <button
              type="button"
              onClick={handleRegisterClick}
              disabled={isLoading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isLoading ? "Creating Account..." : "Sign up"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <span
                className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer"
                onClick={() => setLocation("/login")}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}