
import { createContext, useContext, useState, useEffect } from "react";
import { setupActivityTracking } from "@/utils/sessionUtils";
import { AuthContext } from "@/contexts/AuthContext";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthHandlers } from "@/hooks/useAuthHandlers";
import { useSessionManagement } from "@/hooks/useSessionManagement";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const { user, userRole, isLoading } = useAuthState();
  const { handleLogin, handleSignup, handleSignOut, handleResendVerificationEmail, isAuthorized } = 
    useAuthHandlers(user, userRole);

  useEffect(() => {
    const cleanup = setupActivityTracking(() => setLastActivity(Date.now()));
    return cleanup;
  }, []);

  useSessionManagement(handleSignOut, lastActivity);

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
      {children}
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
