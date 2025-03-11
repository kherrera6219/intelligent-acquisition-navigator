
import React, { useState, useEffect } from 'react';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Cookie, Check } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [accepted, setAccepted] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if consent was previously given
    const hasConsent = localStorage.getItem('cookie-consent') === 'true';
    
    if (!hasConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    setAccepted(hasConsent);
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setAccepted(true);
    setVisible(false);
  };
  
  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'false');
    setVisible(false);
  };
  
  if (!visible || accepted) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="container mx-auto max-w-3xl">
        <Alert className="bg-secondary/95 backdrop-blur-md shadow-lg border border-border/50 p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start gap-3">
              <Cookie className="h-5 w-5 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-base font-medium mb-1">Cookie Consent</h4>
                <p className="text-sm text-gray-300">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept," you consent to our use of cookies as described in our Privacy Policy.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col xs:flex-row gap-3 justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDecline}
                className="order-2 xs:order-1"
              >
                Decline
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleAccept}
                className="order-1 xs:order-2"
              >
                <Check className="mr-1 h-4 w-4" />
                Accept
              </Button>
            </div>
          </div>
        </Alert>
      </div>
    </div>
  );
};

export default CookieConsent;
