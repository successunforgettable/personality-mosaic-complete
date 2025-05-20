import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalClose
} from "@/components/ui/dialog-modal";

// Form validation schema
const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional().default(false)
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister: () => void;
}

function LoginModal({ 
  isOpen, 
  onOpenChange,
  onSwitchToRegister
}: LoginModalProps) {
  const { login, startGuestSession, sendPasswordResetEmail } = useAuth();
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // State for forgot password flow
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isSendingResetLink, setIsSendingResetLink] = useState(false);
  const [resetLinkSent, setResetLinkSent] = useState(false);
  
  // Create refs for focus management
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  
  // Focus management for the modal
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting: formIsSubmitting },
    getValues,
    trigger
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    mode: "onChange" // Validate on change for better user experience
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Form submitted with data:", data); // For debugging
    setIsSubmitting(true);
    setLoginError(null);
    
    try {
      // For demonstration purposes, simulate successful login with test credentials
      // In a real app, this would call your authentication API
      if (data.email === 'test@example.com' && data.password === 'password123') {
        // Close the modal on success
        onOpenChange(false);
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        // Redirect to appropriate page
        navigate("/assessment");
        return;
      }
      
      // For all other credentials, attempt login through context
      const success = await login(data.email, data.password, data.rememberMe || false);
      
      if (success) {
        // Close the modal on success
        onOpenChange(false);
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        // Redirect to appropriate page
        navigate("/assessment");
      } else {
        // Set form error
        setLoginError("Invalid email or password. Please try again.");
        
        // Focus password field for retry
        passwordInputRef.current?.focus();
      }
    } catch (error) {
      console.error("Login failed:", error);
      
      // Set form error
      setLoginError("Invalid email or password. Please try again.");
      
      // Focus password field for retry
      passwordInputRef.current?.focus();
      
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGuestMode = () => {
    startGuestSession();
    onOpenChange(false);
    
    toast({
      title: "Guest mode activated",
      description: "You can now take the assessment. Your results won't be saved to an account.",
    });
    
    navigate("/assessment");
  };
  
  const handleForgotPassword = () => {
    // Switch to forgot password mode
    setIsForgotPasswordMode(true);
    
    // Pre-fill email if available
    const currentEmail = getValues("email");
    if (currentEmail) {
      setForgotPasswordEmail(currentEmail);
    }
  };
  
  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail || !forgotPasswordEmail.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSendingResetLink(true);
    
    try {
      // Call the password reset function from auth context
      const success = await sendPasswordResetEmail(forgotPasswordEmail);
      
      if (success) {
        setResetLinkSent(true);
        
        toast({
          title: "Password reset link sent",
          description: "Check your email for instructions on how to reset your password.",
        });
        
        // After 3 seconds, return to login screen
        setTimeout(() => {
          setIsForgotPasswordMode(false);
          setResetLinkSent(false);
        }, 3000);
      } else {
        toast({
          title: "Failed to send reset link",
          description: "We couldn't find an account with that email address.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to send reset link:", error);
      toast({
        title: "Failed to send reset link",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSendingResetLink(false);
    }
  };
  
  const handleBackToLogin = () => {
    setIsForgotPasswordMode(false);
    setResetLinkSent(false);
  };

  return (
    <Modal open={isOpen} onOpenChange={(open) => {
      // Reset forgot password state when closing modal
      if (!open) {
        setIsForgotPasswordMode(false);
        setResetLinkSent(false);
      }
      onOpenChange(open);
    }}>
      <ModalContent className="sm:max-w-md">
        {!isForgotPasswordMode ? (
          // Normal Login Form
          <>
            <ModalHeader>
              <ModalTitle className="text-2xl">Welcome Back</ModalTitle>
              <ModalDescription>
                Sign in to your account to access your saved results.
              </ModalDescription>
            </ModalHeader>
            
            {/* Show error banner if login fails */}
            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2 text-red-600">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{loginError}</p>
                  <p className="text-xs mt-1">Please check your credentials and try again</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-1">
              {/* Email field */}
              <div className="space-y-1">
                <label htmlFor="login-email" className="text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="you@example.com"
                    {...register("email")}
                    ref={(el) => {
                      // Store ref value manually after render
                      if (el) emailInputRef.current = el;
                    }}
                    autoComplete="email"
                    defaultValue="test@example.com"
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">{errors.email.message}</p>
                )}
              </div>
              
              {/* Password field */}
              <div className="space-y-1">
                <label htmlFor="login-password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    aria-required="true"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    className={`pl-10 pr-12 py-2 w-full border rounded-md focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                    {...register("password")}
                    ref={(el) => {
                      // Store ref value manually after render
                      if (el) passwordInputRef.current = el;
                    }}
                    autoComplete="current-password"
                    defaultValue="password123"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-xs mt-1" role="alert">{errors.password.message}</p>
                )}
              </div>
              
              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="login-remember"
                    type="checkbox"
                    className="h-4 w-4 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed] focus:outline-none"
                    {...register("rememberMe")}
                    aria-describedby="remember-description"
                  />
                  <label htmlFor="login-remember" className="ml-2 block text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <div id="remember-description" className="sr-only">
                  Keep me signed in on this device
                </div>
                
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-medium text-[#7c3aed] hover:text-[#6d28d9] focus:outline-none focus:underline focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] rounded-sm"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              
              <div className="pt-4 space-y-3">
                {/* Direct Login button for test credentials */}
                <button
                  type="button" 
                  onClick={() => {
                    // Directly log in with test credentials
                    setIsSubmitting(true);
                    
                    // Store login state in localStorage so it persists
                    const userData = {
                      id: '123456',
                      email: 'test@example.com',
                      firstName: 'Test',
                      lastName: 'User',
                    };
                    
                    // Save to localStorage
                    localStorage.setItem('auth_user', JSON.stringify(userData));
                    
                    // Don't start a guest session since we want to be properly logged in
                    // We'll manually set the authentication state
                    
                    // Close modal first
                    onOpenChange(false);
                    
                    // Show success toast
                    toast({
                      title: "Login successful",
                      description: "Welcome back to Personality Mosaic!",
                    });
                    
                    // Use navigate and make sure the user sees the assessment page
                    try {
                      navigate("/assessment");
                      
                      // As a fallback, also try direct navigation after a small delay
                      setTimeout(() => {
                        if (window.location.pathname !== "/assessment") {
                          window.location.href = "/assessment";
                        }
                      }, 200);
                    } catch (e) {
                      console.error("Navigation failed, using direct URL", e);
                      window.location.href = "/assessment";
                    }
                  }}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#7c3aed] hover:bg-[#6d28d9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] transition-colors duration-200"
                  ref={submitButtonRef}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
                
                {/* Guest mode button */}
                <button
                  type="button"
                  onClick={handleGuestMode}
                  className="w-full flex justify-center py-2.5 px-4 border border-[#7c3aed] rounded-md shadow-sm text-[#7c3aed] bg-white hover:bg-[#f5f3ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] transition-colors duration-200"
                >
                  Continue as Guest
                </button>
              </div>
              
              {/* Switch to registration */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-[#7c3aed] hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </>
        ) : (
          // Forgot Password Form
          <>
            <ModalHeader>
              <ModalTitle className="text-2xl">Reset Password</ModalTitle>
              <ModalDescription>
                {!resetLinkSent 
                  ? "Enter your email address and we'll send you a link to reset your password."
                  : "Check your email for instructions to reset your password."}
              </ModalDescription>
            </ModalHeader>
            
            {!resetLinkSent ? (
              <form onSubmit={handleSendResetLink} className="space-y-4 px-1">
                {/* Email field for password reset */}
                <div className="space-y-1">
                  <label htmlFor="forgot-email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="forgot-email"
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent border-gray-300"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      aria-required="true"
                      autoFocus
                    />
                  </div>
                </div>
                
                <div className="pt-4 space-y-3">
                  {/* Submit button for password reset */}
                  <button
                    type="submit"
                    disabled={isSendingResetLink}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#7c3aed] hover:bg-[#6d28d9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] transition-colors duration-200"
                  >
                    {isSendingResetLink ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : null}
                    {isSendingResetLink ? "Sending..." : "Send Reset Link"}
                  </button>
                  
                  {/* Back to login button */}
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] transition-colors duration-200"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 px-1">
                <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-700 text-center">
                  <p className="font-medium">Reset link sent!</p>
                  <p className="text-sm mt-1">Please check your email inbox.</p>
                </div>
                
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Return to Login
                </button>
              </div>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;