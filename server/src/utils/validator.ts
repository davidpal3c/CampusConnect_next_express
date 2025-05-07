import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateArticleInput = [
  body('title').isString().trim().escape(),
  body('content').isString().trim().escape(),
  body('type_id').isUUID(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];