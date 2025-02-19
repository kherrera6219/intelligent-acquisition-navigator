
import { Application, Request, Response, NextFunction } from 'express';
import { rateLimiter } from './rateLimit';
import { csrfProtection, securityHeaders, sessionManagement } from './security';
import { texasChatMiddleware } from './texasChat';

export function setupMiddleware(app: Application) {
  // Global middleware
  app.use(rateLimiter);
  app.use(securityHeaders);
  app.use(sessionManagement);
  app.use(csrfProtection);

  // Route-specific middleware
  app.use('/api/texas-chat', texasChatMiddleware);

  // Global error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Global Error:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  });
}
