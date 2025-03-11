
import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthActions } from '@/hooks/useAuthActions';
import { useSessionState } from '@/hooks/useSessionState';
import { useSessionManagement } from '@/hooks/useSessionManagement';
import { useNetworkMonitor } from '@/components/ui/universal/NetworkMonitorProvider';

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

  // Use the session management hook
  useSessionManagement(
    signOut,
    lastActivity,
    SESSION_DURATION,
    showSessionWarning
  );

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
        isAuthenticated,
        login,
        signup,
        signOut,
        userRole,
        isAuthorized,
        resendVerificationEmail: handleResendVerificationEmail,
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
