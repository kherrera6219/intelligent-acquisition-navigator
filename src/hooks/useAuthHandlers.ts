
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { login, signup, signOut, resendVerificationEmail, getRoleHierarchy } from "@/services/authService";

export const useAuthHandlers = (user: any, userRole: string | undefined) => {
  const { toast } = useToast();
  const navigate = useNavigate();

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
      throw error;
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
      throw error;
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

  return {
    handleLogin,
    handleSignup,
    handleSignOut,
    handleResendVerificationEmail,
    isAuthorized,
  };
};
