
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthActions = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;
      
      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account",
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const signOut = async () => {
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Signout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resendVerificationEmail = async (email?: string) => {
    if (!email) return;
    
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) throw error;
      
      toast({
        title: "Email Sent",
        description: "Verification email has been resent",
      });
    } catch (error: any) {
      console.error('Resend verification error:', error);
      toast({
        title: "Failed to Resend Email",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password/confirm`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for instructions to reset your password",
      });
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast({
        title: "Failed to Send Reset Email",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const updatePassword = async (password: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;
      
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated",
      });
    } catch (error: any) {
      console.error('Update password error:', error);
      toast({
        title: "Failed to Update Password",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    login,
    signup,
    signOut,
    resendVerificationEmail,
    resetPassword,
    updatePassword,
    isProcessing,
  };
};
