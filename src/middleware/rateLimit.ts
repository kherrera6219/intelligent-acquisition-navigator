
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// Create a browser-safe hash function since crypto isn't available in browsers
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

// Use different rate limiters for browser and server environments
const createRateLimiter = () => {
  if (typeof window === 'undefined') {
    // Server-side rate limiting
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again after 15 minutes',
      standardHeaders: true,
      legacyHeaders: false,
      keyGenerator: (req) => {
        return req.ip || req.headers['x-forwarded-for'] as string || 'unknown';
      }
    });
  } else {
    // Browser-side rate limiting
    const requests = new Map<string, number[]>();
    const windowMs = 15 * 60 * 1000;
    const maxRequests = 100;

    return (req: Request, res: Response, next: NextFunction) => {
      const now = Date.now();
      const clientId = simpleHash(req.headers['x-client-id'] as string || 'default');
      
      // Get or initialize request timestamps for this client
      let clientRequests = requests.get(clientId) || [];
      
      // Remove timestamps outside the window
      clientRequests = clientRequests.filter(time => now - time < windowMs);
      
      if (clientRequests.length >= maxRequests) {
        res.status(429).json({
          error: 'Too many requests, please try again later'
        });
        return;
      }

      clientRequests.push(now);
      requests.set(clientId, clientRequests);
      next();
    };
  }
};

export const rateLimiter = createRateLimiter();

export const apiRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  return rateLimiter(req, res, next);
};
