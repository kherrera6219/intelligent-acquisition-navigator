
import { useState, useEffect } from 'react';
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { fetchUserRole } from "@/services/authService";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFetchUserRole = async (userId: string) => {
    try {
      const role = await fetchUserRole(userId);
      setUserRole(role);
    } catch (error: any) {
      console.error('Error fetching user role:', error);
      setError(error.message || "Failed to fetch user role");
      toast({
        title: "Error Fetching Role",
        description: error.message || "Failed to fetch user role",
        variant: "destructive",
      });
    }
  };

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

  return { user, userRole, isLoading, handleFetchUserRole, error };
};
