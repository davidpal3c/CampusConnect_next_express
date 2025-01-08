import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

import { verifyIdToken } from '../config/firebase';
import admin from 'firebase-admin';


const prisma = new PrismaClient();

export interface AuthenticatedRequest extends Request {
    user?: any; 
  }

export const login = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
   
    console.log("Login request received");
   
    try {
        const { token, userInfo } = req.body;

        const email = userInfo.email;

        // verify ID token 
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (decodedToken.email !== email) {
            return res.status(400).json({ message: "Email mismatch" });
        }

        // checks if email is pre-registered db
        const user = await prisma.user.findUnique({ 
            where: { email } 
        }); 

        if (!user) {
            return res.status(403).json({
                message: 'Access denied: Email is not pre-registered in the system. Please contact support.' 
            });
        }

        // assign custom claims for roles
        const role = await admin.auth().setCustomUserClaims(decodedToken.uid, { role: user.role });
        console.log(role);

        // const user = req.user; // Access authenticated user information
        console.log("DB User: ", user);
        res.json({
            message: 'Profile data retrieved, Login successful',
            user
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal Server Error' });
        next(error);
    } finally {
        await prisma.$disconnect();
    }
};