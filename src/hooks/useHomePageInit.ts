
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const initialize = async () => {
      try {
        // Simple health check query
        const { error: supabaseError } = await supabase
          .from('health_check')
          .select('count')
          .maybeSingle();

        if (supabaseError) {
          throw new Error('Database connection failed');
        }

        // Check first visit
        const hasVisited = localStorage.getItem('hasVisitedBefore');
        if (hasVisited) {
          setIsFirstVisit(false);
        } else {
          localStorage.setItem('hasVisitedBefore', 'true');
        }

        // Scroll handling
        const handleScroll = () => {
          setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
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
        setIsLoaded(true);
      }
    };

    initialize();
  }, [toast]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
