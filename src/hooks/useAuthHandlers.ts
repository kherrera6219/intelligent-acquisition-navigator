
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { globalRateLimiter } from "@/utils/rateLimit";

export function useAuthHandlers(user: User | null, userRole: string | null) {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      // Apply rate limiting for login attempts
      if (!globalRateLimiter.check('auth:login')) {
        toast({
          title: "Rate limited",
          description: "Too many login attempts. Please try again later.",
          variant: "destructive"
        });
        return;
      }

      setIsProcessing(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Log successful login
      await supabase.from('user_sessions').insert([
        { 
          user_id: (await supabase.auth.getUser()).data.user?.id,
          event_type: 'login',
          metadata: { source: 'web' }
        }
      ]);

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in."
      });

      // Redirect to dashboard
      navigate('/dashboard');
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
      // Apply rate limiting for signup attempts
      if (!globalRateLimiter.check('auth:signup')) {
        toast({
          title: "Rate limited",
          description: "Too many signup attempts. Please try again later.",
          variant: "destructive"
        });
        return;
      }

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
      // Apply rate limiting for sign out attempts
      if (!globalRateLimiter.check('auth:signout')) {
        toast({
          title: "Rate limited",
          description: "Too many sign out attempts. Please try again later.",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Log successful signout
      await supabase.from('user_sessions').insert([
        {
          user_id: user?.id,
          event_type: 'logout',
          metadata: { source: 'web' }
        }
      ]);

      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
      
      // Navigate to home after signout
      navigate('/');
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
      // Apply rate limiting for email resend attempts
      if (!globalRateLimiter.check('auth:resend-verification')) {
        toast({
          title: "Rate limited",
          description: "Too many email resend attempts. Please try again later.",
          variant: "destructive"
        });
        return;
      }

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
