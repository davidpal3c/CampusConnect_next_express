import xss from 'xss';
import { Request, Response, NextFunction } from 'express';

// Middleware to sanitize user input
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
    next();
  };


  // Sanitization function for HTML content 
export const sanitizeHTML = (html: string) => {
  return xss(html, {
    whiteList: {
      a: ['href', 'title', 'target'],
      img: ['src', 'alt', 'title'],
      p: [],
      br: [],
      b: [],
      i: [],
      strong: [],
      em: [],
      ul: [],
      ol: [],
      li: [],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'],
  });
};