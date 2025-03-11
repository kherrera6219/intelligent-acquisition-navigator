
import React from 'react';
import { X, Info, ExternalLink, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface PrivacyBannerProps {
  onLearnMore: () => void;
  onClose: () => void;
  className?: string;
  type?: 'standard' | 'compact' | 'inline';
  position?: 'top' | 'bottom';
  fixed?: boolean;
  showIcon?: boolean;
}

export function PrivacyBanner({ 
  onLearnMore, 
  onClose, 
  className,
  type = 'standard',
  position = 'bottom',
  fixed = true,
  showIcon = true
}: PrivacyBannerProps) {
  const bannerStyles = {
    standard: 'p-4 sm:p-6',
    compact: 'p-3 sm:p-4',
    inline: 'p-3 mx-auto max-w-6xl rounded-lg my-4'
  };

  const positionStyles = {
    top: 'top-0 left-0 right-0 z-50',
    bottom: 'bottom-0 left-0 right-0 z-50'
  };

  return (
    <div 
      className={cn(
        "w-full bg-primary/90 backdrop-blur text-white shadow-lg",
        fixed && "fixed",
        positionStyles[position],
        bannerStyles[type],
        className,
        "ms-motion-slideInBottom"
      )}
      role="alert"
      aria-live="polite"
    >
      <div className={cn(
        "flex items-start gap-4",
        type === 'inline' ? 'max-w-screen-xl mx-auto' : '',
      )}>
        {showIcon && (
          <div className="hidden sm:flex items-center justify-center h-9 w-9 rounded-full bg-white/10 shrink-0">
            <Shield className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
        )}
        
        <div className="flex-1 space-y-2">
          <div className="font-medium">Privacy Notice</div>
          <p className="text-sm text-primary-foreground">
            We value your privacy. This site uses cookies and similar technologies to personalize content, analyze traffic, and ensure you get the best experience on our website.
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={onLearnMore}
              className="bg-white text-primary hover:bg-white/90 hover:text-primary/90 flex items-center gap-1.5"
            >
              Learn More
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClose}
              className="text-white border border-white/30 hover:bg-white/10"
            >
              I Understand
            </Button>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="shrink-0 rounded-md p-1 text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-1 focus:ring-offset-primary"
          aria-label="Close privacy notice"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
