
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

interface KeyboardShortcut {
  key: string;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'h',
      action: () => {
        navigate('/');
        toast({
          title: "Navigation",
          description: "Navigated to Home",
        });
      },
      description: "Navigate to Home"
    },
    {
      key: 'd',
      action: () => {
        navigate('/dashboard');
        toast({
          title: "Navigation",
          description: "Navigated to Dashboard",
        });
      },
      description: "Navigate to Dashboard"
    },
    {
      key: 'k',
      action: () => {
        toast({
          title: "Shortcut",
          description: "Command palette opened",
        });
      },
      description: "Open command palette"
    },
    {
      key: '?',
      action: () => {
        toast({
          title: "Help",
          description: "Keyboard shortcuts: Ctrl/⌘ + H (Home), D (Dashboard), K (Search), ? (Help)",
        });
      },
      description: "Show keyboard shortcuts help"
    }
  ];

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Only trigger if Ctrl/Cmd is pressed
    if (!(event.ctrlKey || event.metaKey)) return;

    const shortcut = shortcuts.find(s => s.key === event.key);
    if (shortcut) {
      event.preventDefault();
      shortcut.action();
    }
  }, [navigate, toast, shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
};
