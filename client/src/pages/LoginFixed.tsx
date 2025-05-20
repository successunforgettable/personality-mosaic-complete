import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginFixed() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated, startGuestSession } = useAuth();
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const returnPath = sessionStorage.getItem('returnPath') || '/assessment';
      sessionStorage.removeItem('returnPath');
      setLocation(returnPath);
    }
  }, [isAuthenticated, setLocation]);
  
  // Handle email change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
    setGeneralError("");
  };
  
  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError("");
    setGeneralError("");
  };
  
  // Handle remember me change
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Validate form
  const validateForm = () => {
    let isValid = true;
    
    // Clear previous errors
    setEmailError("");
    setPasswordError("");
    setGeneralError("");
    
    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }
    
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", email);
      
      // Attempt login
      const success = await login(email, password, rememberMe);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Personality Mosaic!",
        });
        
        // Get return path
        const returnPath = sessionStorage.getItem('returnPath') || '/assessment';
        sessionStorage.removeItem('returnPath');
        
        console.log("Login successful, redirecting to:", returnPath);
        
        // Redirect
        window.location.href = returnPath;
      } else {
        console.log("Login failed");
        setGeneralError("Invalid email or password. Please try again.");
        
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setGeneralError("An error occurred during login. Please try again.");
      
      toast({
        title: "Login failed",
        description: "There was a problem with authentication. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle guest mode
  const handleGuestMode = () => {
    startGuestSession();
    toast({
      title: "Guest mode activated",
      description: "You can now take the assessment. Your results won't be saved to an account.",
    });
    setLocation("/assessment");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f1f5f9] to-[#ede9fe]">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div 
              className="inline-flex items-center mb-5 cursor-pointer"
              onClick={() => setLocation("/")}
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] flex items-center justify-center text-white mr-3">
                <Mail className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-semibold text-[#1e293b]">Personality Mosaic</h1>
            </div>
            <h2 className="text-2xl font-semibold text-[#1e293b] mt-4">Sign in to your account</h2>
            <p className="text-[#64748b] mt-2">Welcome back! Sign in to continue building your personality tower</p>
            
            {/* Login information */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-3 text-left">
              <h3 className="text-sm font-medium text-blue-800">Test Account Available</h3>
              <p className="text-xs text-blue-700 mt-1">
                For testing purposes, you can use: email: test@example.com, password: password123
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* General error message */}
                {generalError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                    {generalError}
                  </div>
                )}
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1e293b] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email" 
                      value={email}
                      onChange={handleEmailChange}
                      className={`pl-10 pr-3 py-2 w-full border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent`}
                      placeholder="you@example.com"
                      disabled={isLoading}
                    />
                  </div>
                  {emailError && (
                    <p className="mt-1 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
                
                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-[#1e293b]">
                      Password
                    </label>
                    <button 
                      type="button"
                      onClick={() => setLocation("/forgot-password")}
                      className="text-xs font-medium text-[#7c3aed] hover:text-[#6d28d9]"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      className={`pl-10 pr-10 py-2 w-full border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent`}
                      placeholder="••••••••"
                      disabled={isLoading}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {passwordError && (
                    <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                  )}
                </div>
                
                {/* Remember me */}
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    className="h-4 w-4 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed]"
                    disabled={isLoading}
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7c3aed] hover:bg-[#6d28d9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] transition-colors duration-200"
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
                </div>
              </div>
            </form>
            
            <div className="mt-6">
              <button
                type="button"
                onClick={handleGuestMode}
                className="w-full flex justify-center py-3 px-4 border border-[#7c3aed] rounded-md shadow-sm text-[#7c3aed] bg-white hover:bg-[#f5f3ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] transition-colors duration-200"
              >
                Continue as Guest
              </button>
              <p className="text-xs text-[#64748b] text-center mt-2">
                No account needed, but your results won't be saved
              </p>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-[#64748b]">
                Don't have an account?{' '}
                <span 
                  className="font-medium text-[#7c3aed] hover:text-[#6d28d9] cursor-pointer"
                  onClick={() => setLocation("/signup")}
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}