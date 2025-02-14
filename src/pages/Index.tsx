
import { useState } from "react";
import { PrivacyNotice } from "@/components/landing/PrivacyNotice";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import CookieConsent from "@/components/CookieConsent";

const Index = () => {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {showPrivacyNotice && (
        <PrivacyNotice onClose={() => setShowPrivacyNotice(false)} />
      )}
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <CookieConsent />
    </div>
  );
};

export default Index;
