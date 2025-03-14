
import React, { useState, useEffect, useCallback } from 'react';
import { HomePageContent } from '@/components/landing/HomePageContent';

const HomePage: React.FC = () => {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if it's user's first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setIsFirstVisit(true);
      setShowPrivacyNotice(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }

    // Set up scroll listener for back-to-top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <HomePageContent
      showPrivacyNotice={showPrivacyNotice}
      setShowPrivacyNotice={setShowPrivacyNotice}
      showBackToTop={showBackToTop}
      isFirstVisit={isFirstVisit}
      scrollToTop={scrollToTop}
    />
  );
};

export default HomePage;
