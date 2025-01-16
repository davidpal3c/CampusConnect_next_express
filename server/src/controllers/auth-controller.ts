import { Request, Response } from 'express';
import admin from 'firebase-admin';
import { decode } from 'punycode';


export interface AuthenticatedRequest extends Request {
    user?: any; 
  }

export const loginAdmin = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
   
    try {      
        const { dbUser, adminPermissions, decodedToken } = req.user;

        if (!dbUser || !adminPermissions) {
            throw new Error("User or admin permissions are missing.");
        }

        const enrichedUser = {
            ...dbUser,
            permissions: adminPermissions,    
            role: dbUser.role,                   
        }

        // console.log(">>Decoded token: ", decodedToken);
        // console.log("ENRICHED USER:", enrichedUser);

        const token = req.headers['authorization']?.split(' ')[1]; 
        if (!token) {
            throw new Error("Invalid request: token is missing");
        }

        const sessionCookie = await admin.auth().createSessionCookie(token, { 
            expiresIn: 60 * 60 * 24 * 7 * 1000          // expires in 7 days       
        });

        // set session cookie
        res.cookie('session', sessionCookie, { 
            maxAge: 60 * 60 * 24 * 7 * 1000,            // expires in 7 days
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',            
        });

        res.json({
            status: 'success',
            message: 'Welcome to Campus Connect Admin Portal!',
            data: enrichedUser,
        });

        // console.log("logged user response:", res.cookie.toString());
        
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    } 
};


export const checkSession = async (req: AuthenticatedRequest, res: Response) => {
    
    try {
        const { dbUser, adminPermissions, decodedToken } = req.user;

        const enrichedUser = {
            ...dbUser,
            permissions: adminPermissions,    
            role: decodedToken.role,                   
        }

        res.json({
            status: 'success',
            message: 'Session verified successfully.',
            data: enrichedUser,
        });        

    } catch (error) {
        console.error("Error verifying session:", error);
        res.status(403).json({ status: 'error', message: 'Unauthorized' });
    }
}


