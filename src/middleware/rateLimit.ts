
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  return rateLimiter(req, res, next);
};
