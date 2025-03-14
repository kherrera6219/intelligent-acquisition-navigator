
import React, { useState, useEffect, useCallback } from 'react';
import { ExternalPageLayout } from '@/components/layout/ExternalPageLayout';
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
    <ExternalPageLayout 
      title="Home" 
      description="Discover how our AI-powered acquisition management platform can streamline your procurement process."
    >
      <HomePageContent
        showPrivacyNotice={showPrivacyNotice}
        setShowPrivacyNotice={setShowPrivacyNotice}
        showBackToTop={showBackToTop}
        isFirstVisit={isFirstVisit}
        scrollToTop={scrollToTop}
      />
    </ExternalPageLayout>
  );
};

export default HomePage;
