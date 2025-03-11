
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export interface PrivacyBannerProps {
  onLearnMore: () => void;
  onClose: () => void;
}

export const PrivacyBanner: React.FC<PrivacyBannerProps> = ({ onLearnMore, onClose }) => {
  return (
    <Alert className="bg-secondary/80 border-border/50 rounded-none mb-0 border-b">
      <div className="container mx-auto py-2 px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-sm">
              This website uses cookies to improve your experience. By using our site, you acknowledge our privacy policy.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="link" size="sm" onClick={onLearnMore} className="text-primary hover:text-primary/80">
              Learn more
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default PrivacyBanner;
