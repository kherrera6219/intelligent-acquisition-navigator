
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
    const initialize = async () => {
      try {
        // Health check query with timeout
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Database connection timeout')), 5000);
        });

        const dbCheckPromise = supabase
          .from('health_check')
          .select('count')
          .maybeSingle();

        const { error: supabaseError } = await Promise.race([
          dbCheckPromise,
          timeoutPromise
        ]);

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
        setIsLoaded(true);
        setError(null);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize homepage');
        setError(error);
        
        toast({
          title: "Error initializing page",
          description: error.message || "Please refresh the page to try again",
          variant: "destructive",
        });
        
        setIsLoaded(true); // Ensure page loads even with error
      }
    };

    initialize();
  }, [toast, handleScroll]); // Add handleScroll to dependencies

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
