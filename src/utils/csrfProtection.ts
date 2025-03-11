
/**
 * CSRF Protection Utilities
 * Provides functions for generating and validating CSRF tokens
 */

import { v4 as uuidv4 } from 'uuid';

// Storage key for CSRF token
const CSRF_TOKEN_KEY = 'app_csrf_token';

/**
 * Generate a new CSRF token and store it
 * @returns The generated CSRF token
 */
export function generateCsrfToken(): string {
  // Generate a token with timestamp to prevent reuse
  const token = `${uuidv4()}-${Date.now()}`;
  
  // Store in localStorage (or sessionStorage for increased security)
  localStorage.setItem(CSRF_TOKEN_KEY, token);
  
  return token;
}

/**
 * Get the current CSRF token, generating a new one if needed
 * @returns The current CSRF token
 */
export function getCsrfToken(): string {
  const token = localStorage.getItem(CSRF_TOKEN_KEY);
  
  // If no token exists, generate a new one
  if (!token) {
    return generateCsrfToken();
  }
  
  return token;
}

/**
 * Validate a CSRF token against the stored one
 * @param token Token to validate
 * @returns True if token is valid, false otherwise
 */
export function validateCsrfToken(token: string): boolean {
  const storedToken = localStorage.getItem(CSRF_TOKEN_KEY);
  
  if (!storedToken || storedToken !== token) {
    return false;
  }
  
  return true;
}

/**
 * Add CSRF token to fetch options
 * @param options Fetch options
 * @returns Updated fetch options with CSRF token in headers
 */
export function addCsrfToken(options: RequestInit = {}): RequestInit {
  const token = getCsrfToken();
  const headers = new Headers(options.headers || {});
  
  headers.append('X-CSRF-Token', token);
  
  return {
    ...options,
    headers
  };
}

/**
 * Create fetch function with CSRF protection
 * @returns Fetch function with CSRF token included
 */
export function createProtectedFetch(): typeof fetch {
  return (input: RequestInfo | URL, init?: RequestInit) => {
    const protectedInit = addCsrfToken(init);
    return fetch(input, protectedInit);
  };
}

// Export a protected fetch instance
export const protectedFetch = createProtectedFetch();
