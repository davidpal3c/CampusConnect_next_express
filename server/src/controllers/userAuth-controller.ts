import { Request, Response } from 'express';
import admin from 'firebase-admin';
import { prisma } from '../config/prismaClient';


export interface AuthenticatedRequest extends Request {
    user?: any; 
  }

  
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 * 1000; 


export const loginUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
   
    try {      
        const { dbUser } = req.user;

        if (!dbUser) {
            throw new Error("User missing in loginUser route handler...");
        }

        const getEnrichedUser = () => {
            if (dbUser?.role === 'Student') {
                const { studentFields } = req.user;
                
                return { ...dbUser, studentFields, }     

            } else if (dbUser?.role === 'Alumni') {
                const { alumniFields } = req.user;
                return { ...dbUser, alumniFields: alumniFields }                                

            } else {
                throw new Error(`Unsupported user role: ${dbUser.role}`);
            }
        }
        
        const enrichedUser = getEnrichedUser();

        // console.log("ENRICHED USER:", enrichedUser);

        const token = req.headers['authorization']?.split(' ')[1]; 
        if (!token) {
            console.error("Invalid request: token is missing");
            res.status(400).json({ status: 'error', message: 'Invalid request: token is missing' });
            return;
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
            message: 'Welcome to Campus Connect!',
            data: enrichedUser,
        });

        // console.log("logged user response:", res.cookie.toString());
        
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    
    } finally {
        // await admin.auth().revokeRefreshTokens(req.user.dbUser.uid);            // revoke refresh tokens after login
        await prisma.$disconnect();
    }
};



export const checkSession = async (req: AuthenticatedRequest, res: Response) => {
    
    try {
        const { dbUser } = req.user;

        if (!dbUser) {
            throw new Error("User missing in User session route handler...");
        }

        const getEnrichedUser = () => {
            if (dbUser?.role === 'Student') {
                const { studentFields } = req.user;
                
                return { ...dbUser, studentFields, }     

            } else if (dbUser?.role === 'Alumni') {
                const { alumniFields } = req.user;
                return { ...dbUser, alumniFields: alumniFields }                                

            } else {
                throw new Error(`Unsupported user role: ${dbUser.role}`);
            }
        }

        const enrichedUser = getEnrichedUser();

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
