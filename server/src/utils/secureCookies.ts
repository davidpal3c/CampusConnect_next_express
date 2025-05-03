import { Request, Response, NextFunction } from 'express';

export const secureCookies = (req: Request, res: Response, next: NextFunction) => {
    res.cookie('session', req.cookies.session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    next();
  };