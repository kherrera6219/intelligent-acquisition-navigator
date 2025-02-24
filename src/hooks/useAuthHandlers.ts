
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function useAuthHandlers(user: User | null, userRole: string | null) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in."
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      toast({
        title: "Welcome!",
        description: "Please check your email to verify your account."
      });
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: "An error occurred during signup. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleResendVerificationEmail = async () => {
    if (!user?.email) return;
    
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email
      });

      if (error) throw error;
      toast({
        title: "Email sent",
        description: "Verification email has been resent."
      });
    } catch (error) {
      console.error('Resend verification error:', error);
      toast({
        title: "Error",
        description: "Failed to resend verification email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const isAuthorized = (requiredRole?: string): boolean => {
    if (!user) return false;
    if (!requiredRole) return true;
    if (userRole === 'admin') return true;
    return userRole === requiredRole;
  };

  return {
    handleLogin,
    handleSignup,
    handleSignOut,
    handleResendVerificationEmail,
    isAuthorized,
    isProcessing
  };
}
