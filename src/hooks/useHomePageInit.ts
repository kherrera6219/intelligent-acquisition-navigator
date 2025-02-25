
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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
    console.log("Homepage mounting...");
    
    const initialize = async () => {
      try {
        // First visit detection with local storage
        const hasVisited = localStorage.getItem('hasVisitedBefore');
        if (hasVisited) {
          setIsFirstVisit(false);
        } else {
          localStorage.setItem('hasVisitedBefore', 'true');
        }

        // Optimized scroll handler with debounce
        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
          if (scrollTimeout) clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            setShowBackToTop(window.scrollY > 400);
          }, 100);
        };

        window.addEventListener('scroll', handleScroll);

        // Simulate any async initialization if needed
        await Promise.resolve();

        // Set loaded state after successful initialization
        setIsLoaded(true);
        setError(null);
        console.log("Setting isLoaded to true");

        return () => {
          clearTimeout(scrollTimeout);
          window.removeEventListener('scroll', handleScroll);
        };
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize homepage');
        console.error("Error in homepage initialization:", error);
        setError(error);
        toast({
          title: "Error initializing page",
          description: error.message || "Please refresh the page to try again",
          variant: "destructive",
        });
        setIsLoaded(true); // Ensure page loads even if there's an error
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
