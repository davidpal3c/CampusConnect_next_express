import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient';

export interface AuthenticatedRequest extends Request {
    user?: any; 
}

//TODO: store user_id for operation logger (include date)
// const operationLog = {
//     user_id: adminPermissions?.user_id,
//     operation: "Check Admin Permissions",
//     timestamp: new Date(),
//   };
// console.log("Operation Log: ", operationLog);


// GET /api/users/ - Get all users
export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const users = await prisma.user.findMany(); 
        res.json(users);
    } catch (error) {
        console.log("error getting all users", error);
        res.status(500).json({ message: "Server Error: could ", error: error });
    } finally {
        await prisma.$disconnect(); 
    }

}

// GET /api/users/:id - Get a single user by ID
export const getUserById = async (req: Request, res: Response) : Promise<void> => {

    try {
        const { id } = req.params; 
        //change to query db for user by email

        if (isNaN(Number(id))) {
            res.status(404).json({ error: 'Invalid ID format' });
            return;
        }

        let user = await prisma.user.findUnique({
            where: { user_id: id },
            include: {
                Student: {  
                    include: {
                        Program: {
                            include: {
                                Department: true
                            }
                        }
                    }
                },
                Admin: true,  
                Alumni: true,
            }
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json(user);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    } finally {
        await prisma.$disconnect(); 
    }
}

// GET /api/users/me - Get current user
export const getMyUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        
        const { email } = req.user.decodedClaims;     

        let user = await prisma.user.findUnique({
            where: { email: email }, 
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (user.role === 'Student') {
            const student = await prisma.student.findUnique({
                where: { user_id: user.user_id },
                include: {
                    Program: {
                        include: {
                            Department: true
                        }
                    }
                }
            });

            if (!student) {
                res.status(404).json({ error: 'Student not found' });
                return;
            }

            user = { ...user, ...student};

            res.status(200).json({ user });
            return;
            
        } else if (user.role === 'Alumni') {
            const alumni = await prisma.alumni.findUnique({
                where: { user_id: user.user_id },
            });

            if (!alumni) {
                res.status(404).json({ error: 'Alumni not found' });
                return;
            }

            user = { ...user, ...alumni};
            
            res.status(200).json({ user });
            return
        }        

        res.status(200).json(user);
        return;
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}

// POST: /api/users/ - Create a new user
export const createUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        // console.log(req.body);
        const { user_id, first_name, last_name, email, role, image_url } = req.body;

        const user = await prisma.user.create({
            data: {
                user_id: user_id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: 'password',        // TODO: hash password
                role: role,
                image_url: image_url || null, 
            }
        });

        if (role === 'Student') {
            const { program_id, department_id, intake_year, intake, status } = req.body;

            await prisma.student.create({
                data: {
                    user_id: user_id,
                    program_id: program_id,
                    department_id: department_id,
                    intake_year: intake_year,
                    intake: intake,
                    status: status,
                    
                }
            });
        } else if (role === 'Alumni') {
            const { graduation_year, credentials, current_position, company } = req.body;

            await prisma.alumni.create({
                data: {
                    user_id: user_id,
                    current_position: current_position || null,
                    company: company || null,
                } as any
            });
        } else if (role === 'Admin') {
            const { permissions } = req.body;

            await prisma.admin.create({
                data: {
                    user_id: user_id,
                    permissions: permissions,
                }
            });
        }

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await prisma.$disconnect(); 
    }
}

// PUT: /api/users/:id - Update a user by ID. This is a full update
export const updateUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            res.status(404).json({ error: 'Invalid ID format' });
            return;
        }

        const { firstName, lastName, email, role, } = req.body;

        const user = await prisma.user.create({
            data: {
                user_id: id,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: 'password',        // TODO: hash password
                role: role,
            }
        });

        if (role === 'Student') {
            const { program_id, department_id, intake_year, status } = req.body;

            await prisma.student.create({
                data: {
                    user_id: id,
                    program_id: program_id,
                    department_id: department_id,
                    intake_year: intake_year,
                    status: status,
                }
            });
        } else if (role === 'Alumni') {
            const { current_position, company } = req.body;

            await prisma.alumni.create({
                data: {
                    user_id: id,
                    current_position: current_position || null,
                    company: company || null,   
                } as any
            });
        }

        res.status(201).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await prisma.$disconnect(); 
    }

}

// DELETE /api/users/:id - Delete a user by ID
export const deleteUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            res.status(404).json({ error: 'Invalid ID format' });
            return;
        }

        const user = await prisma.user.delete({
            where: { user_id: id },
        });

        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
}