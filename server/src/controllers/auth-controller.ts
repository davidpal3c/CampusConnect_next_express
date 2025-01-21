import { Request, Response } from 'express';


export interface AuthenticatedRequest extends Request {
    user?: any; 
  }

export const loginAdmin = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
   
    try {      
        const { dbUser, adminPermissions } = req.user;

        const enrichedUser = {
            ...dbUser,
            permissions: adminPermissions,    
            role: dbUser.role,                   
        }

        res.json({
            status: 'success',
            message: 'Welcome to Campus Connect Admin Portal!',
            data: enrichedUser,
        });
        
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    } 
};