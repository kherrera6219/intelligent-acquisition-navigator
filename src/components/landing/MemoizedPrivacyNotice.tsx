
import React, { memo } from 'react';
import { PrivacyNotice } from './PrivacyNotice';

interface MemoizedPrivacyNoticeProps {
  onLearnMore: () => void;
  onClose: () => void;
}

export const MemoizedPrivacyNotice = memo(
  function MemoizedPrivacyNotice({ onLearnMore, onClose }: MemoizedPrivacyNoticeProps) {
    return (
      <PrivacyNotice
        onLearnMore={onLearnMore}
        onClose={onClose}
      />
    );
  }
);
