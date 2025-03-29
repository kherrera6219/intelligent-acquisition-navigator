
import React, { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { devConfig } from '@/config/devConfig';
import { useToast } from '@/hooks/use-toast';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number | null>(null);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const { isOnline } = useNetworkMonitor();
  const { toast } = useToast();
  
  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
  const SESSION_WARNING_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry
  
  // Initialize auth state
  useEffect(() => {
    // First set up the auth state listener to avoid missing auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          setLastActivity(Date.now());
          fetchUserRole(currentSession?.user?.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setUserRole(null);
          setSession(null);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          fetchUserRole(currentSession.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Track user activity
  useEffect(() => {
    const activityEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    
    const updateLastActivity = () => {
      setLastActivity(Date.now());
    };

    activityEvents.forEach(event => {
      window.addEventListener(event, updateLastActivity);
    });

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, updateLastActivity);
      });
    };
  }, []);

  // Session timeout management
  useEffect(() => {
    if (!session) {
      setSessionTimeRemaining(null);
      setShowSessionWarning(false);
      return;
    }

    const checkSessionTimeout = () => {
      const now = Date.now();
      const inactiveTime = now - lastActivity;
      const timeLeft = SESSION_DURATION - inactiveTime;
      
      setSessionTimeRemaining(timeLeft > 0 ? timeLeft : 0);
      setShowSessionWarning(timeLeft > 0 && timeLeft < SESSION_WARNING_THRESHOLD);

      if (timeLeft <= 0) {
        signOut();
        toast({
          title: "Session expired",
          description: "You've been logged out due to inactivity",
          variant: "destructive"
        });
      }
    };

    const intervalId = setInterval(checkSessionTimeout, 1000);
    return () => clearInterval(intervalId);
  }, [session, lastActivity]);

  const fetchUserRole = async (userId?: string) => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setUserRole(data?.role || null);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole('user'); // Default role
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      // Session management handled by auth state change listener
    } catch (error: any) {
      console.error('Login error:', error);
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
      
      // User will be signed in after email verification
    } catch (error: any) {
      console.error('Signup error:', error);
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
      
      // Session cleanup handled by auth state change listener
    } catch (error: any) {
      console.error('Signout error:', error);
      throw error;
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
        description: "Verification email has been resent. Please check your inbox.",
      });
    } catch (error: any) {
      console.error('Resend verification error:', error);
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
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const refreshSession = async () => {
    try {
      setIsProcessing(true);
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) throw error;
      
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setLastActivity(Date.now());
        
        toast({
          title: "Session Extended",
          description: "Your session has been refreshed",
        });
      }
    } catch (error) {
      console.error('Failed to refresh session:', error);
      toast({
        title: "Session Refresh Failed",
        description: "Please log in again",
        variant: "destructive"
      });
      await signOut();
    } finally {
      setIsProcessing(false);
    }
  };

  const isAuthorized = (requiredRole?: string): boolean => {
    if (devConfig.BYPASS_AUTH) return true;
    if (!user) return false;
    if (!requiredRole) return true;
    
    // Simple role hierarchy
    if (userRole === 'admin') return true;
    if (userRole === 'manager' && requiredRole !== 'admin') return true;
    return userRole === requiredRole;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: devConfig.BYPASS_AUTH ? true : !!user,
        login,
        signup,
        signOut,
        userRole: devConfig.BYPASS_AUTH ? 'admin' : userRole,
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

export default AuthProvider;
