
import React, { memo } from 'react';

export interface PrivacyNoticeProps {
  onLearnMore: () => void;
  onClose: () => void;
}

export const PrivacyNotice = memo(function PrivacyNotice({ onLearnMore, onClose }: PrivacyNoticeProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-800 p-4 z-50 backdrop-blur-md">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex-1 mb-4 sm:mb-0">
          <p className="text-sm text-gray-300">
            <span className="font-medium text-white">Privacy Notice:</span>
            {" "}We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onLearnMore}
            className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
          >
            Learn More
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-md transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
});
