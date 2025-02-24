
import { createContext, useContext, useState, useEffect } from "react";
import { setupActivityTracking } from "@/utils/sessionUtils";
import { AuthContext } from "@/contexts/AuthContext";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthHandlers } from "@/hooks/useAuthHandlers";
import { useSessionManagement } from "@/hooks/useSessionManagement";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [isInitializing, setIsInitializing] = useState(true);
  const { user, userRole, isLoading, error } = useAuthState();
  const { handleLogin, handleSignup, handleSignOut, handleResendVerificationEmail, isAuthorized } = 
    useAuthHandlers(user, userRole);

  useEffect(() => {
    const cleanup = setupActivityTracking(() => setLastActivity(Date.now()));
    return cleanup;
  }, []);

  useEffect(() => {
    // Handle initialization state
    if (!isLoading && isInitializing) {
      setIsInitializing(false);
    }
  }, [isLoading]);

  useSessionManagement(handleSignOut, lastActivity);

  if (isInitializing) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
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
        resendVerificationEmail: handleResendVerificationEmail 
      }}
    >
      {isLoading ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        children
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
