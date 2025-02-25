
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChannel } from '@supabase/supabase-js';

interface HomePageInitState {
  showPrivacyNotice: boolean;
  setShowPrivacyNotice: (show: boolean) => void;
  isLoaded: boolean;
  showBackToTop: boolean;
  isFirstVisit: boolean;
  scrollToTop: () => void;
  error: Error | null;
}

export const useHomePageInit = (): HomePageInitState => {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const [channels, setChannels] = useState<RealtimeChannel[]>([]);

  // Memoize the scroll handler
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setShowBackToTop(scrollPosition > 400);
  }, []);

  // Memoize the scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;
    
    const initialize = async () => {
      try {
        // Clear any existing sessions to prevent SID conflicts
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.warn('Session check failed:', sessionError);
        }

        // Health check query with timeout and retry logic
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Database connection timeout')), 5000);
        });

        const dbCheckPromise = supabase
          .from('health_check')
          .select('count')
          .maybeSingle();

        const { data, error: supabaseError } = await Promise.race([
          dbCheckPromise,
          timeoutPromise
        ]) as { data: any; error: Error | null };

        if (supabaseError) {
          throw new Error('Database connection failed');
        }

        // Check first visit with fallback
        try {
          const hasVisited = localStorage.getItem('hasVisitedBefore');
          if (hasVisited) {
            setIsFirstVisit(false);
          } else {
            localStorage.setItem('hasVisitedBefore', 'true');
          }
        } catch (storageErr) {
          console.warn('LocalStorage not available:', storageErr);
        }

        // Add scroll handler with performance optimization
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        if (isMounted) {
          setIsLoaded(true);
          setError(null);
        }

      } catch (err) {
        console.error('Initialization error:', err);
        
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying initialization (attempt ${retryCount}/${maxRetries})...`);
          // Exponential backoff for retries
          setTimeout(initialize, Math.pow(2, retryCount) * 1000);
          return;
        }

        const error = err instanceof Error ? err : new Error('Failed to initialize homepage');
        
        if (isMounted) {
          setError(error);
          toast({
            title: "Error initializing page",
            description: error.message || "Please refresh the page to try again",
            variant: "destructive",
          });
          setIsLoaded(true); // Ensure page loads even with error
        }
      }
    };

    initialize();

    // Cleanup function
    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
      
      // Close any active channels
      channels.forEach(channel => {
        supabase.removeChannel(channel);
      });
    };
  }, [toast, handleScroll, channels]); 

  return {
    showPrivacyNotice,
    setShowPrivacyNotice,
    isLoaded,
    showBackToTop,
    isFirstVisit,
    scrollToTop,
    error
  };
};
