
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { z } from 'zod';

// Input validation schemas
export const userInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  message: z.string().min(10).max(1000),
}).strict();

// CSRF Protection
export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-csrf-token'];
  const storedToken = (req as any).session?.csrfToken;

  if (!token || !storedToken || token !== storedToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  next();
};

// Generate CSRF Token
export const generateCsrfToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Security Headers
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
};

// Input Sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
};

// Session Management
export const sessionManagement = (req: Request, res: Response, next: NextFunction) => {
  if (!(req as any).session) {
    (req as any).session = {
      lastAccess: Date.now(),
      csrfToken: generateCsrfToken()
    };
  } else {
    // Session timeout after 30 minutes of inactivity
    const thirtyMinutes = 30 * 60 * 1000;
    if (Date.now() - (req as any).session.lastAccess > thirtyMinutes) {
      (req as any).session = null;
      return res.status(440).json({ error: 'Session expired' });
    }
    (req as any).session.lastAccess = Date.now();
  }
  next();
};

// Request Rate Limiting
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly windowMs: number = 15 * 60 * 1000; // 15 minutes
  private readonly maxRequests: number = 100; // Max requests per window

  check(ip: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    let clientRequests = this.requests.get(ip) || [];
    clientRequests = clientRequests.filter(time => time > windowStart);
    
    if (clientRequests.length >= this.maxRequests) {
      return false;
    }
    
    clientRequests.push(now);
    this.requests.set(ip, clientRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter();
