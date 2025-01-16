// declare namespace Express {
//     export interface Request {
//       user?: any;
//     }
//   }

import { Request } from 'express'; // Import Request type

declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}