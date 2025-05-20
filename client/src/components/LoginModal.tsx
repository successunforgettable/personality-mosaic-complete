import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import SocialAuthButton from "./SocialAuthButton";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
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
  const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);
  
  // State for forgot password modal
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  
  // Create refs for focus management
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });
  
  const { register, handleSubmit, formState: { errors }, getValues, setError: setFormError } = form;
  
  // Focus the email input when the modal opens
  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      // Small delay to ensure the modal is fully rendered
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Handle Enter key in email field to move to password field
  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && passwordInputRef.current) {
      e.preventDefault();
      passwordInputRef.current.focus();
    }
  };
  
  // Handle form submission
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      setLoginError(null);
      
      // Normalizing email to prevent case-sensitivity issues
      const normalizedData = {
        ...data,
        email: data.email.toLowerCase().trim()
      };
      
      // Attempt login
      const success = await login(normalizedData.email, normalizedData.password, normalizedData.rememberMe);
      
      if (success) {
        // Close the modal
        onOpenChange(false);
        
        // Show success message
        toast({
          title: "Login successful!",
          description: "Welcome back to Personality Mosaic",
        });
        
        // Redirect to assessment or profile
        navigate("/assessment");
      } else {
        setLoginError("Login failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };
  
  const handleGuestLogin = async () => {
    try {
      setIsSubmitting(true);
      startGuestSession();
      onOpenChange(false);
      
      toast({
        title: "Guest session started",
        description: "You can now explore the assessment as a guest",
      });
      
      navigate("/assessment");
    } catch (error) {
      console.error("Guest login error:", error);
      toast({
        title: "Error",
        description: "Failed to start guest session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSocialAuth = async (provider: "google" | "facebook") => {
    try {
      setIsSocialLoading(provider);
      
      // Show a toast message for unimplemented feature
      toast({
        title: "Coming Soon",
        description: `${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication will be available soon.`,
      });
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    } catch (error) {
      console.error(`${provider} auth error:`, error);
      toast({
        title: "Authentication Failed",
        description: `${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication failed. Please try another method.`,
        variant: "destructive"
      });
    } finally {
      setIsSocialLoading(null);
    }
  };
  
  return (
    <>
      {/* Main Login Modal */}
      <Modal open={isOpen && !showForgotPasswordModal} onOpenChange={onOpenChange}>
        <ModalContent className="sm:max-w-[425px]">
          <ModalHeader>
            <ModalTitle className="text-xl font-bold text-center">Login to Personality Mosaic</ModalTitle>
            <ModalDescription className="text-center">
              Enter your details to access your account
            </ModalDescription>
            <ModalClose />
          </ModalHeader>
          
          <div className="flex flex-col gap-6 p-6">
            {/* Login form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Error message */}
              {loginError && (
                <div className="bg-red-50 p-3 rounded-md border border-red-200 text-red-600 text-sm flex items-start gap-2">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}
              
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className={`w-full pl-10 py-2 border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                    disabled={isSubmitting}
                    onKeyDown={handleEmailKeyDown}
                    {...register("email")}
                    ref={(e) => {
                      register("email").ref(e);
                      emailInputRef.current = e;
                    }}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              
              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`w-full pl-10 pr-10 py-2 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                    disabled={isSubmitting}
                    {...register("password")}
                    ref={(e) => {
                      register("password").ref(e);
                      passwordInputRef.current = e;
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
              
              {/* Remember me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  {...register("rememberMe")}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white font-medium rounded-md transition disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>
            
            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            {/* Social login options */}
            <div className="grid grid-cols-2 gap-3">
              <SocialAuthButton
                provider="google"
                onClick={() => handleSocialAuth("google")}
                isLoading={isSocialLoading === "google"}
              />
              <SocialAuthButton
                provider="facebook"
                onClick={() => handleSocialAuth("facebook")}
                isLoading={isSocialLoading === "facebook"}
              />
            </div>
            
            {/* Guest login */}
            <button
              type="button"
              onClick={handleGuestLogin}
              disabled={isSubmitting}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:pointer-events-none"
            >
              Continue as Guest
            </button>
            
            {/* Register link */}
            <div className="text-center">
              <span className="text-sm text-gray-600">Don't have an account?</span>{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </button>
            </div>
          </div>
        </ModalContent>
      </Modal>
      
      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onOpenChange={setShowForgotPasswordModal}
        onBack={() => setShowForgotPasswordModal(false)}
      />
    </>
  );
}

export default LoginModal;