
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client'; 
import { AuthContext } from '../contexts/AuthContext';
import { useSessionManagement } from '@/hooks/useSessionManagement';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number | null>(null);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const { toast } = useToast();
  const isOnline = useNetworkStatus();

  // Session duration constants
  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
  const WARNING_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiration

  const handleAuthStateChange = async () => {
    try {
      setIsLoading(true);
      const { data } = await supabase.auth.getUser();
      
      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        
        // Fetch user role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();
          
        if (roleData) {
          setUserRole(roleData.role);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivityDetection = () => {
    setLastActivity(Date.now());
    setShowSessionWarning(false);
  };

  const updateSessionTimeRemaining = () => {
    if (!user) {
      setSessionTimeRemaining(null);
      setShowSessionWarning(false);
      return;
    }
    
    const timeElapsed = Date.now() - lastActivity;
    const remaining = Math.max(0, SESSION_DURATION - timeElapsed);
    
    setSessionTimeRemaining(remaining);
    
    // Show warning when session is about to expire
    if (remaining > 0 && remaining <= WARNING_THRESHOLD) {
      setShowSessionWarning(true);
    } else if (remaining === 0) {
      // Session expired
      handleSignOut();
    }
  };

  const handleSignOut = async () => {
    try {
      setIsProcessing(true);
      await supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
      setUserRole(null);
    } catch (error) {
      console.error('Signout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Initialize auth state
  useEffect(() => {
    handleAuthStateChange();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        handleAuthStateChange();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // User activity tracking
  useEffect(() => {
    // Track user activity
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    
    const resetTimer = () => {
      handleActivityDetection();
    };
    
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });
    
    // Check session time remaining periodically
    const interval = setInterval(updateSessionTimeRemaining, 30000); // Check every 30 seconds
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      clearInterval(interval);
    };
  }, [user, lastActivity]);

  // Use the session management hook
  useSessionManagement(
    handleSignOut,
    lastActivity,
    SESSION_DURATION,
    showSessionWarning
  );

  const login = async (email: string, password: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      handleActivityDetection();
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

  const signOut = handleSignOut;

  const resendVerificationEmail = async () => {
    if (!user?.email) return;
    
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
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
        redirectTo: `${window.location.origin}/reset-password`,
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

  const refreshSession = async () => {
    handleActivityDetection();
    setShowSessionWarning(false);
    
    toast({
      title: "Session Extended",
      description: "Your session has been refreshed",
    });
  };

  const isAuthorized = (requiredRole?: string) => {
    if (!isAuthenticated || !userRole) return false;
    if (!requiredRole) return true;
    
    // Simple role hierarchy check
    if (userRole === 'admin') return true;
    if (userRole === 'manager' && requiredRole !== 'admin') return true;
    return userRole === requiredRole;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        signOut,
        userRole,
        isAuthorized,
        resendVerificationEmail,
        resetPassword,
        updatePassword,
        isProcessing,
        sessionTimeRemaining,
        showSessionWarning,
        refreshSession,
        isOnline
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
