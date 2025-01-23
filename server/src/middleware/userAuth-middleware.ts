import { Request, Response, NextFunction } from 'express';
import { initializeFirebaseAdmin } from '../config/firebase';
import admin from 'firebase-admin';
import { prisma } from '../config/prismaClient';

export interface AuthenticatedRequest extends Request {
    user?: any; 
}

type StudentFields = {
    program_id?: string;
    program_name?: string;
    department?: any;
    status?: string;
}

declare module 'express-serve-static-core' {
    interface Request {
      session?: any; 
    }
  }


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


export const userRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

        try {
        // checks if email is pre-registered in db
        const email = req.user.decodedToken.email;
        const user = await prisma.user.findUnique({ 
            where: { email },
            select: {
                user_id: true,
                email: true,
                first_name: true,
                last_name: true,
                role: true,
                created_at: true,
                updated_at: true,
            }
        }); 
        
        if (!user) {
            res.status(404).json({ status: 'error', message: 'User not found. Please contact support' });
            return;
        }

        // retrieve user fields based on role (Student/Alumni) from db
        if (user?.role === "Student") {
            let studentTemporary = await prisma.student.findUnique({
                where: {
                    user_id: user.user_id, 
                },
                include: {
                    Program: {
                        include: {
                            Department: true, 
                        },
                    },
                },
            });

            const studentFields: StudentFields = {
                program_id: studentTemporary?.program_id,
                program_name: studentTemporary?.Program?.name,
                department: studentTemporary?.Program?.Department,
                status: studentTemporary?.status,
            };

            studentTemporary = null;

            req.user = { ...req.user, dbUser: user, studentFields: studentFields };

        } else if (user?.role === "Alumni") {
            const alumniFields = await prisma.alumni.findUnique({ where: { user_id: user.user_id } });
            
            req.user = { ...req.user, dbUser: user, alumniFields: alumniFields };

        } else {
            res.status(403).json({
                status: 'error',
                message: 'Forbidden Access: User role not found. Please contact support.' 
            });
            return;
        }
   
        next();

    } catch (error: any) {
        console.log("User route error:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
        return;
    }
}

export const setCustomClaims = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { decodedToken, dbUser } = req.user;

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

// session request route: verify session cookie and set user object in request
export const verifySession = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
            
        initializeFirebaseAdmin(); 

        const sessionCookie = req.cookies['session'];
        // console.log("Session Cookie:  ", sessionCookie);

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