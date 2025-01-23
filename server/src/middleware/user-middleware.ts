import { Request, Response, NextFunction } from 'express';
import { initializeFirebaseAdmin, getAuth } from '../config/firebase';
import { prisma } from '../config/prismaClient';


export interface AuthenticatedRequest extends Request {
    user?: any; 
}
export const verifySession = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {            
        initializeFirebaseAdmin(); 
        const sessionCookie = req.cookies['session'];
        console.log("Session Cookie:  ", sessionCookie);

        if (!sessionCookie) {
            res.status(403).json({ status: 'error', message: 'Unauthorized: Session cookie is missing' });
            //redirect to login page
            return;
        }
 
        const decodedClaims = await getAuth().verifySessionCookie(sessionCookie, true); 

        req.user = { decodedClaims: decodedClaims };

        next();        
        
    } catch (error: any) {
        console.error("Error verifying session:", error);
        res.status(403).json({ status: 'error', message: 'Unauthorized', error: error.message });
        return;
    }
}

export const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { decodedClaims } = req.user;     

        if (!decodedClaims.role || decodedClaims.role !== "Admin") {
            res.status(403).json({ status: 'error', message: 'Forbidden Access: Admin privileges required.' });
            return;
        }

        const email = decodedClaims.email;        

        const adminPermissions = await prisma.user.findUnique({ 
            where: { 
                email: email
            },
            select: {
                user_id: true, 
                Admin: {
                    select: {
                        permissions: true
                    }
                }
            }
        });        

        //TODO: store user_id for operation logger (include date)
        // const operationLog = {
        //     user_id: adminPermissions?.user_id,
        //     operation: "Check Admin Permissions",
        //     timestamp: new Date(),
        //   };
        // console.log("Operation Log: ", operationLog);
 
        if (
            !adminPermissions ||
            !adminPermissions.Admin ||
            !adminPermissions.Admin.permissions ||
            (
              !adminPermissions.Admin.permissions.includes("Read-Only") &&
              !adminPermissions.Admin.permissions.includes("Read-Write") &&
              !adminPermissions.Admin.permissions.includes("Full Access")
            )
          ) {
            res.status(403).json({ status: 'error', message: 'Forbidden Access: Admin privileges required (protect Route).' });
            return;
        }

        next();        
    } catch (error: any) {
        console.error("Error verifying ID Token:", error);
        res.status(403).json({ status: 'error', message: 'Unauthorized', error: error.message });
        return;
    }
}