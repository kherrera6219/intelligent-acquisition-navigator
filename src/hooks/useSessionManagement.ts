
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SESSION_TIMEOUT, ACTIVITY_TIMEOUT } from "@/utils/sessionUtils";
import { supabase } from "@/integrations/supabase/client";

export const useSessionManagement = (
  handleSignOut: () => Promise<void>,
  lastActivity: number
) => {
  const { toast } = useToast();
  const navigate = useNavigate();

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
  }, [lastActivity, toast, handleSignOut]);
};
