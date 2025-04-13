import { decode } from 'punycode';
import { Request, Response, NextFunction } from 'express';
import { initializeFirebaseAdmin } from '../config/firebase';
import admin from 'firebase-admin';
import { prisma } from '../config/prismaClient';

export interface AuthenticatedRequest extends Request {
    user?: any; 
}

declare module 'express-serve-static-core' {
    interface Request {
      session?: any; 
    }
  }

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
// middleware to protect routes
export const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        // firebase initialization
        initializeFirebaseAdmin();

        // validate request
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            res.status(400).json({ status: 'error', message: 'Invalid request: id token not provided' });
            return;
        }

        // verify ID token
        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = { decodedToken: decodedToken };                             
        next();
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
        return;
        // return res.redirect(`${process.env.CLIENT_ORIGIN}/admin/login`);
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
// middleware to check if user is admin
export const adminRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

        try {
        // checks if email is pre-registered in db
        const email = req.user.decodedToken.email;
        const user = await prisma.user.findUnique({ 
            where: { email }
        }); 
        
        if (!user) {
            res.status(404).json({ status: 'error', message: 'User not found. Please contact support' });
            return;
        }

        // checks if user is admin
        if (user?.role !== "Admin"){
            res.status(403).json({
                status: 'error',
                message: 'Forbidden Access: Admin privileges required. Please contact support.' 
            });
            return;          
        } 

        // retrieve admin permission from db
        const permissions = await prisma.admin.findUnique({ where: { user_id: user.user_id } });
        
        if (!permissions) {
            res.status(404).json({ status: 'error', message: 'Admin permissions not found' });
            return;
        }        
                
        req.user = { ...req.user, dbUser: user, adminPermissions: permissions };            
        next();

    } catch (error: any) {
        console.log("Admin route error:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
        return;
    }
}

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
// middleware to set custom claims in firebase
export const setCustomClaims = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { decodedToken, dbUser, adminPermissions } = req.user;

        // console.log("Admin permissions (set custom claims middleware): ", adminPermissions); 

        const userRecord = await admin.auth().getUser(decodedToken.uid);
        const existingClaims = userRecord.customClaims;

        const customClaims = {
            role: dbUser.role,
            permissions: adminPermissions.permissions
        };

        await admin.auth().setCustomUserClaims(decodedToken.uid, customClaims );
        // if (!existingClaims?.role) {
        //     await admin.auth().setCustomUserClaims(decodedToken.uid, customClaims );
        // }       

        // console.log("Custom Claims set:", customClaims);
        // console.log("Existing Claims set:", existingClaims);
 
        next();
    } catch (error: any) {
        console.log("Set Custom Claims error:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
        return;
    }
}    

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const setUserImage = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req.user;
        const { picture, email } = decodedToken;

        const storedPicture = await prisma.user.findUnique({
            where: { email },
            select: { image_url: true }
        }); 

        if (storedPicture?.image_url === picture || storedPicture?.image_url !== null) {
            // console.log("User image already set:", storedPicture?.image_url);
            return next();
        }
        
        await prisma.user.update({
            where: { email },
            data: { image_url: picture }
        });

        next(); 
    } catch (error: any) {
        console.log("Set User Image error:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
        return;
    }
};


/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
// session request route: verify session cookie and set user object in request
export const verifySession = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        initializeFirebaseAdmin(); 
        const sessionCookie = req.cookies['session'];

        if (!sessionCookie) {
            res.status(403).json({ status: 'error', message: 'Unauthorized: Session cookie is missing' });
            //redirect to login page
            return;
        }

        const decodedToken = await admin.auth().verifySessionCookie(sessionCookie, true);
        req.user = { decodedToken: decodedToken };      
        next();        
        
    } catch (error: any) {
        console.error("Error verifying session:", error);
        res.status(403).json({ status: 'error', message: 'Unauthorized', error: error.message });
        return;
    }
}