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
        title: "Error Fetching Role",
        description: error.message || "Failed to fetch user role",
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error; // Re-throw to handle in the UI
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      await signup(email, password);
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error; // Re-throw to handle in the UI
    }
  };

  const handleSignOut = async () => {
    try {
      if (user) {
        await signOut(user.id);
      }
      navigate("/auth");
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error Signing Out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleResendVerificationEmail = async () => {
    try {
      await resendVerificationEmail(user?.email, user?.id);
      toast({
        title: "Email Sent",
        description: "Verification email has been sent. Please check your inbox.",
      });
    } catch (error: any) {
      console.error('Verification email error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isAuthorized = (requiredRole: string): boolean => {
    try {
      if (!user || !userRole) return false;
      return getRoleHierarchy(userRole, requiredRole);
    } catch (error: any) {
      console.error('Authorization error:', error);
      toast({
        title: "Authorization Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
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
