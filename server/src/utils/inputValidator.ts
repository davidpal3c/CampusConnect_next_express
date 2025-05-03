import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateUserInput = [
    // body('email').isEmail().normalizeEmail(),
    // body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
];