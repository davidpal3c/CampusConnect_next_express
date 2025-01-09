import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

import { initializeFirebaseAdmin } from '../config/firebase';
import admin from 'firebase-admin';


const prisma = new PrismaClient();

export interface AuthenticatedRequest extends Request {
    user?: any; 
  }

export const loginAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("Login request received");
   
    try {
        //TODO: add MIDDLEWARE separately to login route

        initializeFirebaseAdmin();

        const { token, userInfo } = req.body;

        if (!token || !userInfo || !userInfo.email) {
            return res.status(400).json({ status: 'error', message: 'Invalid request: token or email is missing' });
        }

        const email = userInfo.email;
        

        // verify ID token : protectRoute
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (decodedToken.email !== email) {
            return res.status(400).json({ message: "Email mismatch" });
        }

        // approveUser middleware: pre-registered email check + admin user type check (next())
        
        // checks if email is pre-registered in db
        const user = await prisma.user.findUnique({ where: { email } }); 
        
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found. Please contact support' });
        }

        // checks if user is admin
        if (user?.role !== "Admin"){
            return res.status(403).json({
                status: 'error',
                message: 'Forbidden Access: Admin privileges required. Please contact support.' 
            });          
        } 

        // retrieve admin permission from db
        const adminPermission = await prisma.admin.findUnique({ where: { user_id: user.user_id } });
        if (!adminPermission) {
            return res.status(404).json({ status: 'error', message: 'Admin permissions not found' });
        }

        // check if custom claims are set already, if not set them
        const existingClaims = decodedToken.role
        if (!existingClaims) {
            await admin.auth().setCustomUserClaims(decodedToken.uid, { role: user.role} );
        }

        const enrichedUser = {
            ...user,
            permissions: adminPermission.permissions,    
            role: existingClaims.role || user.role,
            // role: user?.role                   
        }

        return res.json({
            status: 'success',
            message: 'Profile data retrieved, Login successful',
            data: enrichedUser,
        });
        
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    } 
};