import React, { useState, useEffect } from 'react';
import { useLocation, useRoute, Link } from 'wouter';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPassword() {
  // Get the token from URL
  const [, params] = useRoute('/reset-password');
  const [_, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if token is present
    if (!token) {
      setError('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newPassword || !confirmPassword) {
      setError('Both fields are required');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }
      
      // Password reset successful
      setResetSuccess(true);
      toast({
        title: "Success",
        description: "Your password has been reset successfully",
      });
      
    } catch (error: any) {
      console.error('Password reset error:', error);
      setError(error.message || 'An error occurred while resetting your password');
      toast({
        title: "Error",
        description: error.message || 'Failed to reset password',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            {resetSuccess 
              ? "Your password has been reset successfully."
              : "Please enter your new password below."}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="bg-destructive/15 p-3 rounded-md mb-4 text-destructive text-sm">
              {error}
            </div>
          )}
          
          {!token && (
            <div className="text-center py-4">
              <p className="mb-4">Invalid or expired reset link.</p>
              <Link href="/login">
                <Button>Return to Login</Button>
              </Link>
            </div>
          )}
          
          {token && !resetSuccess && (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    disabled={isLoading}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          )}
          
          {resetSuccess && (
            <div className="text-center py-4">
              <p className="mb-4">Your password has been reset successfully.</p>
              <Link href="/login">
                <Button>Login with New Password</Button>
              </Link>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Remember your password? <Link href="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}