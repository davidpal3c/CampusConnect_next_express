import { Request, Response, NextFunction } from 'express';
import { initializeFirebaseAdmin, getAuth } from '../config/firebase';
import { prisma } from '../config/prismaClient';


export interface AuthenticatedRequest extends Request {
    user?: any; 
}

// export const verifyUserOwnership = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         const { decodedClaims } = req.user;  

//         if (!decodedClaims) {
//             res.status(403).json({ status: 'error', message: 'Unauthorized' });
//             return;
//         }

//         // const userEmail = decodedClaims.email;

//         const eventId = req.params.id;

//         const event = await prisma.event.findUnique({
//             where: { event_id: eventId }
//         });

//         if (!event) {
//             res.status(404).json({ status: 'error', message: 'Event not found' });
//             return;
//         }

//         if (event.host !== userId) {
//             res.status(403).json({ status: 'error', message: 'Forbidden Access: User is not the host of this event.' });
//             return;
//         }

//         next();        
//     } catch (error: any) {
//         console.error("Error verifying ownership:", error);
//         res.status(403).json({ status: 'error', message: 'Unauthorized', error: error.message });
//         return;
//     }
// }

