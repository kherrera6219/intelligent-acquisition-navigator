
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Only trigger if Ctrl/Cmd is pressed
    if (!(event.ctrlKey || event.metaKey)) return;

    switch (event.key) {
      case 'h':
        event.preventDefault();
        navigate('/');
        toast({
          title: "Navigation",
          description: "Navigated to Home",
        });
        break;
      case 'd':
        event.preventDefault();
        navigate('/dashboard');
        toast({
          title: "Navigation",
          description: "Navigated to Dashboard",
        });
        break;
      case 'k':
        event.preventDefault();
        // Toggle command palette or search
        toast({
          title: "Shortcut",
          description: "Command palette opened",
        });
        break;
      case '?':
        event.preventDefault();
        // Show keyboard shortcuts help
        toast({
          title: "Help",
          description: "Keyboard shortcuts: Ctrl/⌘ + H (Home), D (Dashboard), K (Search), ? (Help)",
        });
        break;
    }
  }, [navigate, toast]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};
