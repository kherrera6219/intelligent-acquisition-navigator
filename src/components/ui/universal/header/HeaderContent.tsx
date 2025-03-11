
import React from 'react';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import { HeaderActionButtons } from './HeaderActionButtons';
import { HeaderUserMenu } from './HeaderUserMenu';

interface HeaderContentProps {
  isMobile?: boolean;
  mobileMenuOpen?: boolean;
  refreshSession?: () => Promise<void>;
  user?: any;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  isMobile = false,
  mobileMenuOpen = false,
  refreshSession,
  user
}) => {
  return (
    <TooltipProvider>
      <div className={cn(
        "flex items-center gap-4",
        isMobile && !mobileMenuOpen && "hidden md:flex",
        mobileMenuOpen && "absolute top-14 right-4 bg-gray-800/90 backdrop-blur-md p-4 rounded-xl border border-gray-700 flex-col items-start shadow-lg z-50 ms-motion-scaleIn"
      )}>
        <HeaderActionButtons 
          refreshSession={refreshSession} 
          mobileMenuOpen={mobileMenuOpen}
          isMobile={isMobile}
        />
        
        {user && <HeaderUserMenu user={user} mobileMenuOpen={mobileMenuOpen} />}
      </div>
    </TooltipProvider>
  );
};
