
import React, { useEffect } from 'react';
import { HeaderLogo } from "@/components/ui/universal/header/HeaderLogo";
import { HeaderContent } from "@/components/ui/universal/header/HeaderContent";
import { HeaderActionButtons } from "@/components/ui/universal/header/HeaderActionButtons";
import { HeaderUserMenu } from "@/components/ui/universal/header/HeaderUserMenu";
import { useAuth } from "@/hooks/useAuth";
import { generateCsrfToken } from '@/utils/csrfProtection';
import { OfflineSyncStatus } from '@/components/ui/universal/OfflineSyncStatus';

const UniversalInternalHeader: React.FC = () => {
  const { user } = useAuth();
  
  // Initialize CSRF token on mount
  useEffect(() => {
    generateCsrfToken();
  }, []);
  
  return (
    <header className="w-full bg-background/70 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-40 h-16">
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <HeaderLogo />
          <HeaderContent />
        </div>
        
        <div className="flex items-center gap-4">
          <OfflineSyncStatus compact />
          <HeaderActionButtons />
          {user && <HeaderUserMenu user={user} />}
        </div>
      </div>
    </header>
  );
};

export default UniversalInternalHeader;
