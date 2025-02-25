
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useHomePageInit = () => {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Homepage mounting...");
    
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

      // Set loaded state after initializations
      setIsLoaded(true);
      console.log("Setting isLoaded to true");

      return () => {
        clearTimeout(scrollTimeout);
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (error) {
      console.error("Error in homepage initialization:", error);
      toast({
        title: "Error initializing page",
        description: "Please refresh the page to try again",
        variant: "destructive",
      });
      setIsLoaded(true); // Ensure page loads even if there's an error
    }
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
    scrollToTop
  };
};
