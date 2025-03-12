
import { useCallback, useEffect, useRef } from 'react';
import { isKeyboardUser } from '@/utils/keyboardNavigationDetector';

interface UseKeyboardAccessibleOptions {
  onEnter?: (e: React.KeyboardEvent) => void;
  onSpace?: (e: React.KeyboardEvent) => void;
  onEscape?: (e: React.KeyboardEvent) => void;
  onArrows?: (direction: 'up' | 'down' | 'left' | 'right', e: React.KeyboardEvent) => void;
  focusableRef?: React.RefObject<HTMLElement>;
  autoFocus?: boolean;
}

/**
 * Hook to make components more keyboard accessible
 * Provides handlers for common keyboard interactions
 */
const useKeyboardAccessible = ({
  onEnter,
  onSpace,
  onEscape,
  onArrows,
  focusableRef,
  autoFocus = false
}: UseKeyboardAccessibleOptions = {}) => {
  const internalRef = useRef<HTMLElement | null>(null);
  const ref = focusableRef || internalRef;
  
  // Auto-focus the element if requested
  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus, ref]);
  
  // Handle keyboard events
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        if (onEnter) {
          e.preventDefault();
          onEnter(e);
        }
        break;
      case ' ':
        if (onSpace) {
          e.preventDefault();
          onSpace(e);
        }
        break;
      case 'Escape':
        if (onEscape) {
          e.preventDefault();
          onEscape(e);
        }
        break;
      case 'ArrowUp':
        if (onArrows) {
          e.preventDefault();
          onArrows('up', e);
        }
        break;
      case 'ArrowDown':
        if (onArrows) {
          e.preventDefault();
          onArrows('down', e);
        }
        break;
      case 'ArrowLeft':
        if (onArrows) {
          e.preventDefault();
          onArrows('left', e);
        }
        break;
      case 'ArrowRight':
        if (onArrows) {
          e.preventDefault();
          onArrows('right', e);
        }
        break;
    }
  }, [onEnter, onSpace, onEscape, onArrows]);
  
  // Return props to spread on your component
  return {
    ref,
    onKeyDown: handleKeyDown,
    tabIndex: 0,
    'aria-keyshortcuts': onEnter ? 'Enter' : undefined,
    className: isKeyboardUser() ? 'keyboard-focus-indicator' : '',
  };
};

export default useKeyboardAccessible;
