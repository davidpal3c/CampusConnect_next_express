import { Request, Response } from 'express';
import admin from 'firebase-admin';
import { decode } from 'punycode';
import { prisma } from '../config/prismaClient';


export interface AuthenticatedRequest extends Request {
    user?: any; 
  }

  
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 * 1000; 


export const loginAdmin = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
   
    try {      
        const { dbUser, adminPermissions } = req.user;

        if (!dbUser || !adminPermissions) {
            throw new Error("User or admin permissions are missing.");
        }

        const enrichedUser = {
            ...dbUser,
            permission: adminPermissions.permissions,                
        }

        const token = req.headers['authorization']?.split(' ')[1]; 
        if (!token) {
            throw new Error("Invalid request: token is missing");
        }

        const sessionCookie = await admin.auth().createSessionCookie(token, { 
            expiresIn: SESSION_COOKIE_MAX_AGE         // expires in 7 days       
        });

        // set session cookie
        res.cookie('session', sessionCookie, { 
            maxAge: SESSION_COOKIE_MAX_AGE,            // expires in 7 days
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',            
        });

        res.status(200).json({
            status: 'success',
            message: `Welcome to Campus Connect Admin Portal! ${dbUser.first_name} ${dbUser.last_name}`,
            data: enrichedUser,
        });

        // console.log("logged user response:", res.cookie.toString());
        
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    } finally { 
        await prisma.$disconnect();
    }
};

export const checkSession = async (req: AuthenticatedRequest, res: Response) => {
    
    try {
        const { dbUser, adminPermissions, decodedToken } = req.user;

        const enrichedUser = {
            ...dbUser,
            permissions: adminPermissions,                 
        }

        res.json({
            status: 'success',
            message: 'Session verified successfully.',
            data: enrichedUser,
        });        

    } catch (error) {
        console.error("Error verifying session:", error);
        res.status(403).json({ status: 'error', message: 'Unauthorized' });
    } finally {
        await prisma.$disconnect();
    }
}

export const logout = async (req: AuthenticatedRequest, res: Response) => {
    try {
        res.clearCookie('session', {
            httpOnly: true,   
            secure: process.env.NODE_ENV === 'production',  
            sameSite: 'strict',  
            path: '/',  
        });

        res.status(200).json({ status: 'success', message: 'Logged out successfully' });
    } catch (error) {
        console.error("Error clearing session cookie:", error);
        res.status(500).json({ status: 'error', message: 'Error logging out' });
    } finally {
        await prisma.$disconnect();
    }
};
