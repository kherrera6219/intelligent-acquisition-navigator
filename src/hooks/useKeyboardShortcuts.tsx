
import { useEffect } from 'react';

export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Control + / shows help
      if (e.ctrlKey && e.key === '/') {
        console.log('Showing keyboard shortcuts help');
        // Implement showing help dialog
      }

      // Control + H goes to home
      if (e.ctrlKey && e.key === 'h') {
        console.log('Navigate to home');
        window.location.href = '/';
      }

      // Control + D goes to dashboard
      if (e.ctrlKey && e.key === 'd') {
        console.log('Navigate to dashboard');
        window.location.href = '/dashboard';
      }

      // Control + S goes to settings
      if (e.ctrlKey && e.key === 's') {
        // Prevent the browser's save dialog
        e.preventDefault();
        console.log('Navigate to settings');
        window.location.href = '/settings';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};

export default useKeyboardShortcuts;
