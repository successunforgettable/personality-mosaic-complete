import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
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
} from "@/components/ui/dialog-modal";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({ 
  isOpen, 
  onOpenChange,
  onSwitchToRegister
}: LoginModalProps) {
  const { login, startGuestSession } = useAuth();
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would validate against the API
      // For now, we'll simulate the authentication flow
      
      // Close the modal
      onOpenChange(false);
      
      // Redirect to login with Replit Auth
      login();
      
      toast({
        title: "Redirecting to login",
        description: "You'll be redirected to the authentication page.",
      });
    } catch (error) {
      console.error("Login failed:", error);
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
    toast({
      title: "Password Reset",
      description: "Please check your email for password reset instructions.",
    });
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="sm:max-w-md">
        <ModalHeader>
          <ModalTitle className="text-2xl">Welcome Back</ModalTitle>
          <ModalDescription>
            Sign in to your account to access your saved results.
          </ModalDescription>
        </ModalHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-1">
          {/* Email field */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="you@example.com"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          
          {/* Password field */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`pl-10 pr-12 py-2 w-full border rounded-md focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          
          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed]"
                {...register("rememberMe")}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-medium text-[#7c3aed] hover:text-[#6d28d9]"
              >
                Forgot password?
              </button>
            </div>
          </div>
          
          <div className="pt-4 space-y-3">
            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#7c3aed] hover:bg-[#6d28d9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7c3aed] transition-colors duration-200"
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
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
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;