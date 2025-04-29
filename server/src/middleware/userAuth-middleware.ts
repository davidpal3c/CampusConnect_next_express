import { Department, AlumniStudy } from './../../node_modules/.prisma/client/index.d';
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
    
    console.log("Protect Route (Auth Middleware)");
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

        console.log("Decoded Token:", decodedToken);

        req.user = { decodedToken: decodedToken };                             
        next();
    } catch (error: any) {
        console.error('Protect Route error: ', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
        return;
        // return res.redirect(`${process.env.CLIENT_ORIGIN}/admin/login`);
    }
}


export const userRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

        console.log("User Route Middleware");
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

        const userId = user.user_id;
        console.log("User ID: ", userId);

        console.log("DB User Role:", user?.role);

        // retrieve user fields based on role (Student/Alumni) from db
        if (user?.role === "Student") {
            // const studentFields = await prisma.student.findUnique({
            //     where: { user_id: userId },
            // });

            const studentFields = await prisma.student.findUnique({
                where: { user_id: userId },
                include: {
                    Program: {
                        include: {
                            Department: true
                        }
                    }
                }
            });

            console.log("Student Fields: ", studentFields);

            if (!studentFields) {
                console.error("Student fields not found for user", email);
                res.status(404).json({ status: 'error', message: 'Student profile incomplete. Contact support.' });
                return;
            }
            
            req.user = { ...req.user, dbUser: user, studentFields: studentFields };

        } else if (user?.role === "Alumni") {
            const alumniFields = await prisma.alumni.findUnique({ 
                where: { user_id: user.user_id }, 
                select: {
                    current_position: true,
                    company: true,
                    AlumniStudy: {
                        select: {
                            graduation_year: true,
                            Program: {
                                select: {
                                    name: true,
                                    program_id: true
                                }
                            },
                            Department: {
                                select: {
                                    name: true,
                                    department_id: true
                                }
                            }
                        }
                    }
                } 
            });
        
            if (!alumniFields) {
                console.error("Alumni fields not found for user", email);
                res.status(404).json({ status: 'error', message: 'Alumni profile incomplete. Contact support.' });
                return;
            }
        
            req.user = { ...req.user, dbUser: user, alumniFields: alumniFields };

        } else {
            console.error(`User role not matched. Role received: ${user?.role}`);
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
    
    console.log("Set Custom Claims Middleware");
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

// set user image in db
export const setUserImage = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { decodedToken } = req.user;
        const { picture, email } = decodedToken;

        const storedPicture = await prisma.user.findUnique({
            where: { email },
            select: { image_url: true }
        }); 

        if (storedPicture?.image_url === picture) {
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