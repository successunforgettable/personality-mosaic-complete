import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
}

export function ForgotPasswordModal({
  isOpen,
  onOpenChange,
  onBack
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const { toast } = useToast();
  const { sendPasswordResetEmail } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await sendPasswordResetEmail(email);
      
      if (success) {
        setRequestSent(true);
      } else {
        toast({
          title: "Error",
          description: "Failed to send reset email. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            {!requestSent 
              ? "Enter your email address and we'll send you a link to reset your password."
              : "Password reset email sent! Check your inbox for further instructions."}
          </DialogDescription>
        </DialogHeader>
        
        {!requestSent ? (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            
            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                disabled={isLoading}
              >
                Back to Login
              </Button>
              <Button 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Reset Password"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-6">
            <Button 
              onClick={onBack} 
              className="w-full"
            >
              Return to Login
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}