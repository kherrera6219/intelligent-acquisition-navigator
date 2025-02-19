
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

// CSRF Protection
export const csrfProtection = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const token = req.headers['x-csrf-token'];
  const storedToken = req.session?.csrfToken;

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
export const securityHeaders = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
};

// Session Management
export const sessionManagement = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  if (!req.session) {
    req.session = {
      lastAccess: Date.now(),
      csrfToken: generateCsrfToken()
    };
  } else {
    // Session timeout after 30 minutes of inactivity
    const thirtyMinutes = 30 * 60 * 1000;
    if (Date.now() - req.session.lastAccess > thirtyMinutes) {
      req.session = null;
      return res.status(440).json({ error: 'Session expired' });
    }
    req.session.lastAccess = Date.now();
  }
  next();
};
