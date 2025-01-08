import { verifyIdToken } from '../config/firebase';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: any; // Add user property to Request object
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Header error' });        
    }
    
    // extract token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized: No Token Available' });

    try {
        const decodedToken = await verifyIdToken(token);
        req.body = decodedToken;                        // Add the decoded token to the request body to be used in the controller
        next();                                  
        // next(req.body as AuthenticatedRequest);                    // Call the next middleware
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
    }
}