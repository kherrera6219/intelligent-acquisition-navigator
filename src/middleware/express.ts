
import { Application, Request, Response, NextFunction } from 'express';
import { rateLimiter } from './rateLimit';
import { csrfProtection, securityHeaders, sessionManagement } from './security';

export function setupMiddleware(app: Application) {
  // Apply security middleware
  app.use(rateLimiter);
  app.use(securityHeaders);
  app.use(sessionManagement);
  app.use(csrfProtection);

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
}
