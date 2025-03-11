
import React, { useState, useEffect } from 'react';
import { HeaderLogo } from "@/components/ui/universal/header/HeaderLogo";
import { HeaderContent } from "@/components/ui/universal/header/HeaderContent";
import { HeaderActionButtons } from "@/components/ui/universal/header/HeaderActionButtons";
import { HeaderUserMenu } from "@/components/ui/universal/header/HeaderUserMenu";
import { useAuth } from "@/hooks/useAuth";
import { generateCsrfToken } from '@/utils/csrfProtection';
import { OfflineSyncStatus } from '@/components/ui/universal/OfflineSyncStatus';

const UniversalInternalHeader: React.FC = () => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Initialize CSRF token on mount
  useEffect(() => {
    generateCsrfToken();
    
    // Check if mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Function to refresh session
  const refreshSession = async () => {
    // This would typically call your refresh token endpoint
    console.log('Session refresh requested');
    // Example implementation:
    // await authService.refreshSession();
  };
  
  return (
    <header className="w-full bg-background/70 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-40 h-16">
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <HeaderLogo />
          <HeaderContent 
            isMobile={isMobile}
            mobileMenuOpen={mobileMenuOpen}
            refreshSession={refreshSession}
            user={user}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <OfflineSyncStatus compact />
          <HeaderActionButtons 
            refreshSession={refreshSession}
            mobileMenuOpen={mobileMenuOpen}
            isMobile={isMobile}
          />
          {user && <HeaderUserMenu user={user} mobileMenuOpen={mobileMenuOpen} />}
        </div>
      </div>
    </header>
  );
};

export default UniversalInternalHeader;
