import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState<string>('Verifying your email...');
  const [location] = useLocation();
  
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Get token from URL
        const searchParams = new URLSearchParams(location.split('?')[1]);
        const token = searchParams.get('token');
        
        if (!token) {
          setVerificationStatus('error');
          setMessage('Verification token is missing. Please check your email link.');
          return;
        }
        
        // Make API request to verify email
        const response = await fetch(`/api/auth/verify-email?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          setVerificationStatus('success');
          setMessage(data.message || 'Your email has been successfully verified!');
        } else if (response.status === 400) {
          setVerificationStatus('expired');
          setMessage(data.message || 'Verification link has expired or is invalid.');
        } else {
          setVerificationStatus('error');
          setMessage(data.message || 'Failed to verify email. Please try again.');
        }
      } catch (error) {
        console.error('Email verification error:', error);
        setVerificationStatus('error');
        setMessage('An error occurred during verification. Please try again.');
      }
    };
    
    verifyEmail();
  }, [location]);
  
  return (
    <div className="container mx-auto max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {verificationStatus === 'loading' && 'Verifying Email'}
            {verificationStatus === 'success' && 'Email Verified'}
            {verificationStatus === 'expired' && 'Verification Expired'}
            {verificationStatus === 'error' && 'Verification Failed'}
          </CardTitle>
          <CardDescription className="text-center">
            {verificationStatus === 'loading' && 'Please wait while we verify your email address'}
            {verificationStatus === 'success' && 'Your account is now fully activated'}
            {verificationStatus === 'expired' && 'Your verification link has expired'}
            {verificationStatus === 'error' && 'There was a problem verifying your email'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          {verificationStatus === 'loading' && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
              <p className="text-gray-600">This may take a moment...</p>
            </div>
          )}
          
          {verificationStatus === 'success' && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-gray-600">{message}</p>
            </div>
          )}
          
          {verificationStatus === 'expired' && (
            <div className="flex flex-col items-center gap-4">
              <AlertTriangle className="h-16 w-16 text-amber-500" />
              <p className="text-gray-600">{message}</p>
              <p className="text-sm text-gray-500 mt-2">
                Please request a new verification link by logging in to your account.
              </p>
            </div>
          )}
          
          {verificationStatus === 'error' && (
            <div className="flex flex-col items-center gap-4">
              <XCircle className="h-16 w-16 text-red-500" />
              <p className="text-gray-600">{message}</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center gap-4">
          {verificationStatus === 'success' && (
            <Link href="/login">
              <Button>Login to Your Account</Button>
            </Link>
          )}
          
          {(verificationStatus === 'expired' || verificationStatus === 'error') && (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/">
                <Button>Go to Home</Button>
              </Link>
            </>
          )}
          
          {verificationStatus === 'loading' && (
            <Button disabled>Please wait...</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}