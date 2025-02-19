
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  userRole?: string;
  isAuthorized: (requiredRole: string) => boolean;
  resendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signOut: async () => {},
  isAuthorized: () => false,
  resendVerificationEmail: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds
const ACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const { toast } = useToast();
  const navigate = useNavigate();

  // Track user activity
  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    // Add event listeners for user activity
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);
    window.addEventListener('touchstart', updateActivity);

    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('touchstart', updateActivity);
    };
  }, []);

  // Check for session timeout
  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) return;

      // Use session start time from access token creation
      const sessionStart = new Date(session.data.session.access_token).getTime();
      const now = Date.now();

      // Check absolute session timeout
      if (now - sessionStart > SESSION_TIMEOUT) {
        await signOut();
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
        return;
      }

      // Check inactivity timeout
      if (now - lastActivity > ACTIVITY_TIMEOUT) {
        await signOut();
        toast({
          title: "Session Expired",
          description: "Your session has expired due to inactivity. Please sign in again.",
          variant: "destructive",
        });
        return;
      }
    };

    const interval = setInterval(checkSession, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastActivity, toast]);

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserRole(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setUserRole(data?.role);

      // Log successful role fetch
      await logAuditEvent({
        action: 'FETCH_USER_ROLE',
        userId,
        details: { role: data?.role }
      });
    } catch (error: any) {
      console.error('Error fetching user role:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user role",
        variant: "destructive",
      });
    }
  };

  const logAuditEvent = async (event: {
    action: string;
    userId: string;
    details?: Record<string, any>;
  }) => {
    try {
      await supabase.from('audit_logs').insert({
        user_id: event.userId,
        action: event.action,
        resource_type: 'auth',
        details: event.details,
        ip_address: window.sessionStorage.getItem('user_ip') || null,
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Error logging audit event:', error);
    }
  };

  const signOut = async () => {
    try {
      if (user) {
        await logAuditEvent({
          action: 'USER_LOGOUT',
          userId: user.id,
          details: { trigger: 'user_action' }
        });
      }
      
      await supabase.auth.signOut();
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

  const resendVerificationEmail = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user?.email,
      });

      if (error) throw error;

      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link.",
      });

      await logAuditEvent({
        action: 'RESEND_VERIFICATION_EMAIL',
        userId: user?.id || 'unknown',
        details: { email: user?.email }
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
    
    // Define role hierarchy
    const roleHierarchy = {
      'admin': 3,
      'manager': 2,
      'user': 1
    };

    return roleHierarchy[userRole as keyof typeof roleHierarchy] >= 
           roleHierarchy[requiredRole as keyof typeof roleHierarchy];
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut, userRole, isAuthorized, resendVerificationEmail }}>
      {children}
    </AuthContext.Provider>
  );
}
