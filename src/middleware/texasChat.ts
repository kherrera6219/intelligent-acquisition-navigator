
import { Request, Response, NextFunction } from 'express';
import { rateLimiter } from './rateLimit';
import { csrfProtection, securityHeaders, sessionManagement } from './security';

// Middleware composition for Texas Chat routes
export const texasChatMiddleware = [
  rateLimiter,
  securityHeaders,
  sessionManagement,
  csrfProtection,
  // Error handling specific to Texas Chat
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Texas Chat Error:', err);
    res.status(500).json({ error: 'Texas Chat service error' });
  }
];
