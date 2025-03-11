
/**
 * Input Sanitization Utilities
 * Provides functions for sanitizing and validating user input
 */

import { z } from "zod";

/**
 * Sanitizes HTML/script content from strings to prevent XSS
 * @param input The input string to sanitize
 * @returns Sanitized string with potentially harmful content escaped
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/`/g, '&#x60;')
    .replace(/\$/g, '&#36;');
}

/**
 * Validates an email address format
 * @param email Email to validate
 * @returns True if valid email format, false otherwise
 */
export function isValidEmail(email: string): boolean {
  return z.string().email().safeParse(email).success;
}

/**
 * Validates a strong password
 * @param password Password to validate
 * @returns True if password meets strength requirements, false otherwise
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const passwordSchema = z.string().min(8).refine(
    (pass) => 
      /[A-Z]/.test(pass) && 
      /[a-z]/.test(pass) && 
      /[0-9]/.test(pass) && 
      /[^A-Za-z0-9]/.test(pass),
    {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }
  );
  
  return passwordSchema.safeParse(password).success;
}

/**
 * Validates URL format
 * @param url URL to validate
 * @returns True if valid URL format, false otherwise
 */
export function isValidUrl(url: string): boolean {
  return z.string().url().safeParse(url).success;
}

/**
 * Create form validation schema with sanitization
 * @param schema Zod schema for validation
 * @returns Schema with sanitization applied for string fields
 */
export function createSanitizedSchema<T extends z.ZodTypeAny>(schema: T): T {
  const sanitizeTransform = (input: any) => 
    typeof input === 'string' ? sanitizeHtml(input) : input;
  
  // Apply sanitization transform to all string fields
  const transformedSchema = schema.transform((data) => {
    if (typeof data !== 'object' || data === null) return data;
    
    return Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = sanitizeTransform(value);
      return acc;
    }, {} as any);
  });
  
  // Return the transformed schema with proper type casting
  return transformedSchema as unknown as T;
}

/**
 * Creates an input change handler that sanitizes input
 * @param setValue React state setter function
 * @returns Event handler for input changes
 */
export function createSanitizedChangeHandler(
  setValue: (value: string) => void
): (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(sanitizeHtml(e.target.value));
  };
}
