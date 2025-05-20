import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated, startGuestSession } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Get return path from session storage, default to assessment
      const returnPath = sessionStorage.getItem('returnPath') || '/assessment';
      sessionStorage.removeItem('returnPath');
      setLocation(returnPath);
    }
  }, [isAuthenticated, setLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // We're using Replit Auth, so we redirect to the login page
      login();
      
      toast({
        title: "Redirecting to login",
        description: "You'll be redirected to the authentication page.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "There was a problem with the authentication process. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  // Start a guest session
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
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1e293b] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-[#64748b]" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.email ? 'border-red-500' : 'border-[#cbd5e1]'
                      } rounded-md shadow-sm focus:outline-none focus:ring-[#7c3aed] focus:border-[#7c3aed]`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#1e293b] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[#64748b]" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-10 py-2 border ${
                        errors.password ? 'border-red-500' : 'border-[#cbd5e1]'
                      } rounded-md shadow-sm focus:outline-none focus:ring-[#7c3aed] focus:border-[#7c3aed]`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-[#64748b]" />
                      ) : (
                        <Eye className="h-5 w-5 text-[#64748b]" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
                
                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#7c3aed] border-[#cbd5e1] rounded focus:ring-[#7c3aed]"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-[#64748b]">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a href="#" className="font-medium text-[#7c3aed] hover:text-[#6d28d9]">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#7c3aed] hover:bg-[#6d28d9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] transition-colors duration-200"
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
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
};

export default Login;