import { Request, Response, NextFunction } from 'express';
import { initializeFirebaseAdmin, getAuth } from '../config/firebase';
import { prisma } from '../config/prismaClient';
import { permission } from 'process';


export interface AuthenticatedRequest extends Request {
    user?: any; 
}

export const verifySession = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {            
        initializeFirebaseAdmin(); 
        const sessionCookie = req.cookies['session'];

        if (!sessionCookie) {
            res.status(403).json({ status: 'error', message: 'Unauthorized: Session cookie is missing' });
            //redirect to login page
            return;
        }
 
        const decodedClaims = await getAuth().verifySessionCookie(sessionCookie, true); 

        if (!decodedClaims) {
            res.status(403).json({ status: 'error', message: 'Unauthorized: Invalid session cookie' });
            return;
        }

        req.user = { decodedClaims: decodedClaims };

        next();        
        
    } catch (error: any) {
        console.error("Error verifying session:", error);
        res.status(403).json({ status: 'error', message: 'Unauthorized', error: error.message });
        return;
    }
}

export const adminRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { decodedClaims } = req.user;     

        if (!decodedClaims.role || decodedClaims.role !== "Admin") {
            res.status(403).json({ status: 'error', message: 'Forbidden Access: Admin privileges required.' });
            return;
        }
        
        next();        
    } catch (error: any) {
        console.error("Error verifying ID Token:", error);
        res.status(403).json({ status: 'error', message: 'Unauthorized', error: error.message });
        return;
    }
}


export const validatePermissions = (allowedPermissions: string[]) => {

    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const { decodedClaims } = req.user;   
            
            const adminPermissions = decodedClaims.permissions;   
    
            if (!adminPermissions || !allowedPermissions.includes(adminPermissions)) {
                res.status(403).json({ status: 'error', message: 'Forbidden Access: Insufficient permissions.', permissions: adminPermissions });
                return;
            }   
    
            next();        
        } catch (error: any) {
            console.error("Error verifying ID Token:", error);
            res.status(403).json({ status: 'error', message: 'Unauthorized', error: error.message });
            return;
        }
    }    
}














// export const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         const { decodedClaims } = req.user;     

//         if (!decodedClaims.role || decodedClaims.role !== "Admin") {
//             res.status(403).json({ status: 'error', message: 'Forbidden Access: Admin privileges required.' });
//             return;
//         }
        
//         const adminPermissions = decodedClaims.permissions;
        
//         // const adminPermissions = await prisma.user.findUnique({ 
//         //     where: { 
//         //         email: email
//         //     },
//         //     select: {
//         //         user_id: true, 
//         //         Admin: {
//         //             select: {
//         //                 permissions: true
//         //             }
//         //         }
//         //     }
//         // });    

//         if (
//             !adminPermissions ||
//             (                                                                           // Check if Admin has at least one of the following permissions
//               adminPermissions !== "Read-Only" &&
//               adminPermissions !== "Read-Write" &&
//               adminPermissions !== "Full Access"
//             )
//           ) {
//             res.status(403).json({ status: 'error', message: 'Forbidden Access: Admin privileges required (protect Route).' });
//             return;
//         }   

//         next();        
//     } catch (error: any) {
//         console.error("Error verifying ID Token:", error);
//         res.status(403).json({ status: 'error', message: 'Unauthorized', error: error.message });
//         return;
//     }
// }