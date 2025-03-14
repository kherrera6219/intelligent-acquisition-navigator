
import React, { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthActions } from '@/hooks/useAuthActions';
import { useSessionState } from '@/hooks/useSessionState';
import { useSessionManagement } from '@/hooks/useSessionManagement';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';
import { supabase } from '@/integrations/supabase/client';
import { devConfig } from '@/config/devConfig';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { 
    user, 
    isLoading, 
    isAuthenticated, 
    userRole, 
    isAuthorized 
  } = useAuthState();
  
  const { 
    login, 
    signup, 
    signOut, 
    resendVerificationEmail, 
    resetPassword, 
    updatePassword, 
    isProcessing 
  } = useAuthActions();
  
  const { 
    lastActivity, 
    sessionTimeRemaining, 
    showSessionWarning, 
    refreshSession, 
    SESSION_DURATION 
  } = useSessionState(isAuthenticated);
  
  const { isOnline } = useNetworkMonitor();

  // Use the session management hook if not in development mode
  useSessionManagement(
    signOut,
    lastActivity,
    SESSION_DURATION,
    devConfig.DISABLE_SESSION_TIMEOUT ? false : showSessionWarning
  );

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // Update user state based on auth changes
      console.log('Auth state changed:', event);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Create the wrapper for resendVerificationEmail that includes user email
  const handleResendVerificationEmail = async () => {
    if (user) {
      await resendVerificationEmail(user.email);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: devConfig.BYPASS_AUTH ? true : isAuthenticated, // Always return true in dev mode
        login,
        signup,
        signOut,
        userRole: devConfig.BYPASS_AUTH ? 'admin' : userRole, // Assume admin role in dev mode
        isAuthorized: devConfig.BYPASS_AUTH ? () => true : isAuthorized, // Always return true in dev mode
        resendVerificationEmail: handleResendVerificationEmail,
        resetPassword,
        updatePassword,
        isProcessing,
        sessionTimeRemaining,
        showSessionWarning: devConfig.DISABLE_SESSION_TIMEOUT ? false : showSessionWarning,
        refreshSession,
        isOnline
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
