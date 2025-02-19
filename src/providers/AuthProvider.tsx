
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { SESSION_TIMEOUT, ACTIVITY_TIMEOUT, setupActivityTracking } from "@/utils/sessionUtils";
import { login, signup, signOut, fetchUserRole, resendVerificationEmail, getRoleHierarchy } from "@/services/authService";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  userRole?: string;
  isAuthorized: (requiredRole: string) => boolean;
  resendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  signOut: async () => {},
  isAuthorized: () => false,
  resendVerificationEmail: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = setupActivityTracking(() => setLastActivity(Date.now()));
    return cleanup;
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) return;

      const sessionStart = new Date(session.data.session.access_token).getTime();
      const now = Date.now();

      if (now - sessionStart > SESSION_TIMEOUT || now - lastActivity > ACTIVITY_TIMEOUT) {
        await handleSignOut();
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
      }
    };

    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, [lastActivity, toast]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        handleFetchUserRole(session.user.id);
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await handleFetchUserRole(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleFetchUserRole = async (userId: string) => {
    try {
      const role = await fetchUserRole(userId);
      setUserRole(role);
    } catch (error: any) {
      console.error('Error fetching user role:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user role",
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  const handleSignup = async (email: string, password: string) => {
    await signup(email, password);
  };

  const handleSignOut = async () => {
    try {
      if (user) {
        await signOut(user.id);
      }
      navigate("/auth");
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleResendVerificationEmail = async () => {
    try {
      await resendVerificationEmail(user?.email, user?.id);
      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend verification email",
        variant: "destructive",
      });
    }
  };

  const isAuthorized = (requiredRole: string): boolean => {
    if (!user || !userRole) return false;
    return getRoleHierarchy(userRole, requiredRole);
  };

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
