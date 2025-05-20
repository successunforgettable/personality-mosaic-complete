import { useState } from "react";
import { Eye, EyeOff, Mail, User, Lock, Check, X, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import SocialAuthButton from "./SocialAuthButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose
} from "@/components/ui/dialog-modal";

// Form validation schema
const registrationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
  newsletter: z.boolean().optional(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and privacy policy"
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

interface RegistrationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export function RegistrationModal({ 
  isOpen, 
  onOpenChange,
  onSwitchToLogin
}: RegistrationModalProps) {
  const { register: registerUser, login, startGuestSession } = useAuth();
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  // Password strength calculation
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch,
    reset 
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      newsletter: false,
      agreeTerms: false
    }
  });

  // Watch the password field to calculate strength
  const password = watch("password");
  
  // Calculate password strength whenever password changes
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return Math.min(strength, 5); // Max strength of 5
  };
  
  // Update password strength when password changes
  useState(() => {
    if (password) {
      setPasswordStrength(calculatePasswordStrength(password));
    } else {
      setPasswordStrength(0);
    }
  });
  
  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Call the register function from AuthContext
      const success = await registerUser(
        data.email,
        data.name,
        data.password
      );
      
      if (success) {
        // Show success state
        setRegistrationSuccess(true);
        
        toast({
          title: "Registration successful!",
          description: "Your account has been created successfully.",
        });
        
        // After 2 seconds, close modal and redirect to home/assessment
        setTimeout(() => {
          // Reset the form
          reset();
          
          // Close the modal
          onOpenChange(false);
          
          // Navigate to assessment page
          navigate("/assessment");
        }, 2000);
      } else {
        toast({
          title: "Registration failed",
          description: "This email address may already be in use. Please try another one.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account. Please try again.",
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

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="sm:max-w-md">
        <ModalHeader>
          <ModalTitle className="text-2xl">
            {registrationSuccess ? "Registration Complete" : "Create an Account"}
          </ModalTitle>
          <ModalDescription>
            {registrationSuccess 
              ? "Your account has been created successfully. Redirecting you to login..."
              : "Sign up to save your assessment results and track your progress."
            }
          </ModalDescription>
        </ModalHeader>
        
        {registrationSuccess ? (
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-center text-gray-700">
              Thank you for registering! You'll now be redirected to complete the authentication process.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-1">
            {/* Name field */}
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            
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
              
              {/* Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div 
                        key={level}
                        className={`h-2 w-full rounded-sm ${
                          passwordStrength >= level 
                            ? level <= 2
                              ? 'bg-red-500'
                              : level <= 3
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    {passwordStrength <= 2 && 'Weak password'}
                    {passwordStrength === 3 && 'Moderate password'}
                    {passwordStrength >= 4 && 'Strong password'}
                  </p>
                </div>
              )}
              
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
            
            {/* Confirm Password field */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            {/* Newsletter checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  type="checkbox"
                  className="h-4 w-4 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed]"
                  {...register("newsletter")}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="newsletter" className="text-gray-600">
                  Send me occasional emails about personality insights and updates
                </label>
              </div>
            </div>
            
            {/* Terms agreement */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeTerms"
                  type="checkbox"
                  className={`h-4 w-4 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed] ${
                    errors.agreeTerms ? 'border-red-500' : ''
                  }`}
                  {...register("agreeTerms")}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeTerms" className="text-gray-600">
                  I agree to the <a href="/terms" className="text-[#7c3aed] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[#7c3aed] hover:underline">Privacy Policy</a>
                </label>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-xs mt-1">{errors.agreeTerms.message}</p>
                )}
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
                {isSubmitting ? "Creating Account..." : "Create Account"}
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
            
            {/* Switch to login */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-[#7c3aed] hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

export default RegistrationModal;