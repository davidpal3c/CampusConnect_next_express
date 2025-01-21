import { Request, Response, NextFunction } from 'express';
import { initializeFirebaseAdmin } from '../config/firebase';
import admin from 'firebase-admin';
import { PrismaClient } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
    user?: any; 
}

export const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        // firebase initialization
        initializeFirebaseAdmin();

        // validate request
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            res.status(400).json({ status: 'error', message: 'Invalid request: token or email is missing' });
            return;
        }

        // verify ID token
        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = { decodedToken: decodedToken };                             
        next();
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
        return;
    }
}


export const adminRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
    const prisma = new PrismaClient();

    try {
        // checks if email is pre-registered in db
        const email = req.user.decodedToken.email;
        const user = await prisma.user.findUnique({ where: { email } }); 
        
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


export const setCustomClaims = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { decodedToken, dbUser } = req.user;
        
        // check if custom claims are set already, if not set them
        const userRecord = await admin.auth().getUser(decodedToken.uid);
        const existingClaims = userRecord.customClaims;

        if (!existingClaims?.role) {
            await admin.auth().setCustomUserClaims(decodedToken.uid, { role: dbUser.role} );
        }       

        next();
    } catch (error: any) {
        console.log("Set Custom Claims error:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
        return;
    }
}    