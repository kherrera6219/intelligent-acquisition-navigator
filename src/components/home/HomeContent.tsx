
import React, { useCallback } from 'react';
import { BackToTopButton } from '@/components/ui/navigation/BackToTopButton';
import { HelpButton } from '@/components/ui/navigation/HelpButton';
import { HomeHero } from './sections/HomeHero';
import { HomeFeatures } from './sections/HomeFeatures';
import { HomeCta } from './sections/HomeCta';

interface HomeContentProps {
  showPrivacyNotice: boolean;
  setShowPrivacyNotice: (show: boolean) => void;
  showBackToTop: boolean;
  isFirstVisit: boolean;
  scrollToTop: () => void;
}

export const HomeContent: React.FC<HomeContentProps> = ({
  showBackToTop,
  isFirstVisit,
  scrollToTop,
}) => {
  return (
    <div className="flex flex-col w-full">
      <HomeHero />
      <HomeFeatures />
      <HomeCta />

      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        {showBackToTop && <BackToTopButton onClick={scrollToTop} visible={showBackToTop} />}
        <HelpButton />
      </div>
    </div>
  );
};
