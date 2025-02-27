
import { createContext, useContext, useState, useEffect } from "react";
import { setupActivityTracking } from "@/utils/sessionUtils";
import { AuthContext } from "@/contexts/AuthContext";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthHandlers } from "@/hooks/useAuthHandlers";
import { useSessionManagement } from "@/hooks/useSessionManagement";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Toaster } from "@/components/ui/toaster";
import NetworkStatusBanner from "@/components/ui/universal/NetworkStatusBanner";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [isInitializing, setIsInitializing] = useState(true);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number | null>(null);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const isOnline = useNetworkStatus();
  
  const { user, userRole, isLoading, error } = useAuthState();
  const { 
    handleLogin, 
    handleSignup, 
    handleSignOut, 
    handleResendVerificationEmail, 
    handlePasswordReset,
    handlePasswordUpdate,
    isAuthorized,
    isProcessing,
    refreshSession
  } = useAuthHandlers(user, userRole);

  // Time in ms before showing warning (5 minutes before expiry)
  const SESSION_WARNING_THRESHOLD = 5 * 60 * 1000;
  // Session duration (30 minutes)
  const SESSION_DURATION = 30 * 60 * 1000;

  useEffect(() => {
    const cleanup = setupActivityTracking(() => {
      setLastActivity(Date.now());
      setShowSessionWarning(false); // Reset warning on user activity
    });
    return cleanup;
  }, []);

  useEffect(() => {
    // Handle initialization state
    if (!isLoading && isInitializing) {
      setIsInitializing(false);
    }
  }, [isLoading, isInitializing]);

  // Session timeout monitoring
  useEffect(() => {
    if (!user) return;
    
    const checkSessionTime = () => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      const remainingTime = SESSION_DURATION - timeSinceLastActivity;
      
      setSessionTimeRemaining(remainingTime > 0 ? remainingTime : 0);
      
      // Show warning when approaching timeout
      if (remainingTime < SESSION_WARNING_THRESHOLD && remainingTime > 0 && !showSessionWarning) {
        setShowSessionWarning(true);
      }
      
      // Auto refresh session when there's activity and we're under warning threshold
      if (timeSinceLastActivity < 60000 && remainingTime < SESSION_WARNING_THRESHOLD && remainingTime > 0) {
        refreshSession();
        setShowSessionWarning(false);
      }
    };
    
    const interval = setInterval(checkSessionTime, 1000);
    return () => clearInterval(interval);
  }, [user, lastActivity, showSessionWarning, refreshSession]);

  // Use the enhanced session management hook
  useSessionManagement(handleSignOut, lastActivity, SESSION_DURATION, showSessionWarning);

  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-red-500">Authentication Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading,
        isAuthenticated: !!user, 
        login: handleLogin,
        signup: handleSignup,
        signOut: handleSignOut, 
        userRole, 
        isAuthorized,
        resendVerificationEmail: handleResendVerificationEmail,
        resetPassword: handlePasswordReset,
        updatePassword: handlePasswordUpdate,
        isProcessing,
        sessionTimeRemaining,
        showSessionWarning,
        refreshSession,
        isOnline
      }}
    >
      {isLoading ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          {children}
          <Toaster />
          <NetworkStatusBanner />
          {showSessionWarning && user && (
            <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black py-2 px-4 text-center z-50">
              <p className="text-sm font-medium">
                Your session will expire soon. 
                <button 
                  onClick={refreshSession}
                  className="ml-2 underline font-bold hover:text-yellow-800"
                >
                  Click to stay logged in
                </button>
              </p>
            </div>
          )}
        </>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
