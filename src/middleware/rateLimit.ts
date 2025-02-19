
import { Request, Response, NextFunction } from 'express';

class BrowserRateLimiter {
  private requests: Map<string, number[]>;
  private windowMs: number;
  private maxRequests: number;

  constructor() {
    this.requests = new Map();
    this.windowMs = 15 * 60 * 1000; // 15 minutes
    this.maxRequests = 100;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(7);
  }

  check(clientId: string = this.generateId()): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    let clientRequests = this.requests.get(clientId) || [];
    clientRequests = clientRequests.filter(time => time > windowStart);
    
    if (clientRequests.length >= this.maxRequests) {
      return false;
    }
    
    clientRequests.push(now);
    this.requests.set(clientId, clientRequests);
    return true;
  }
}

const limiter = new BrowserRateLimiter();

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  if (!limiter.check()) {
    return res.status(429).json({
      error: 'Too many requests, please try again later'
    });
  }
  next();
};

export const apiRateLimiter = rateLimiter;
