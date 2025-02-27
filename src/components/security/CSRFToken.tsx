
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

/**
 * Component that generates and manages CSRF tokens
 * This should be included in forms that perform sensitive operations
 */
export const CSRFToken = () => {
  const [csrfToken, setCsrfToken] = useLocalStorage<string>('csrfToken', '');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Generate a new CSRF token if one doesn't exist
    if (!csrfToken) {
      const newToken = generateCSRFToken();
      setCsrfToken(newToken);
    }
    setIsReady(true);
  }, [csrfToken, setCsrfToken]);

  if (!isReady) {
    return null;
  }

  return (
    <input type="hidden" name="csrfToken" value={csrfToken} />
  );
};

/**
 * Generate a CSRF token
 * @returns A random string to use as a CSRF token
 */
function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Custom hook for using CSRF tokens in components
 * @returns The current CSRF token
 */
export const useCSRFToken = (): string => {
  const [csrfToken] = useLocalStorage<string>('csrfToken', '');
  return csrfToken;
};
