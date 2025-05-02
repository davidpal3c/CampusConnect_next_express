import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient';
import { Status } from '@prisma/client';

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

        res.status(200).json(users);
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
            res.status(404).json({ error: 'Invalid ID format.' });
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

// GET /api/users/:role - Get user fields by role
export const getUserFieldsByRole = async (req: Request, res: Response) : Promise<void> => {
    try {
        const role = req.params.role;

        let userFields;

        if (role === 'Student') {
            const students = await prisma.student.findMany({
                include: {
                    Program: {
                        select: {
                            name: true,
                            program_id: true,
                            Department: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    }
                }
            });
            userFields = students; 
            // console.log("students", students);

        } else if (role === 'Prospective Student') {
            const prospectiveStudents = await prisma.student.findMany({
                where: { status: 'Prospective' },
                include: {
                    Program: {
                        include: {
                            Department: true
                        }
                    }
                }
            });

            userFields = prospectiveStudents;

        } else if (role === 'Alumni') {
            const alumni = await prisma.alumni.findMany({
                select: {
                    user_id: true,
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
            userFields = alumni;

        } else if (role === 'Admin') {
            const admins = await prisma.admin.findMany({
                select : {
                    user_id: true,
                    permissions: true,
                }
            });
            userFields = admins;

        } else {
            res.status(400).json({ error: 'Invalid role' });
            return;
        }
        
        if (!userFields) {
            res.status(404).json({ error: 'No users found for this role' });
            return;
        }

        console.log("userFields", userFields);

        res.status(200).json(userFields);
        return
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        return; 
    } finally { 
        await prisma.$disconnect(); 
    }
};

// GET /api/users/students/:status - Get students by status
export const getStudentsByStatus = async (req: Request, res: Response) : Promise<void> => {
    try {
        
        const status = req.params.status as Status;
        
        // Check if the statusParam is one of the allowed enum values.
        if (!Object.values(Status).includes(status as Status)) {
            res.status(400).json({ error: 'Invalid status value' });
            return;
        }

        const students = await prisma.user.findMany({
            where: {
              role: 'Student',
              Student: { 
                status: status  
              },
            },
            include: {
                Student: {
                    include: {
                        Program: {
                            select: {
                                name: true,
                                program_id: true,
                                Department: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!students) {
            res.status(404).json({ error: 'No students found for this status' });
            return;
        }

        // console.log("students", students);
        res.status(200).json(students);
        return;

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};

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
    } finally {
        await prisma.$disconnect(); 
    }
}

// POST: /api/users/ - Create a new user
export const createUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        // console.log(req.body);
        const { user_id, first_name, middle_name, last_name, email, role, image_url } = req.body;

        console.log(req.body)
        let userType = 'User';

        await prisma.$transaction(async (tx) => {

            const existingUser: any = await tx.user.findUnique({
                where: { email: email },
            });

            if (existingUser) {
                res.status(409).json({ error: 'User with same email already exists' });
                return;
            }

            if (existingUser?.user_id === user_id) {
                res.status(409).json({ error: 'User ID already exists' });
                return;
            }

            await tx.user.create({
                data: {
                    user_id: user_id,
                    first_name: first_name,
                    middle_name: middle_name || null,
                    last_name: last_name,
                    email: email,
                    // password: password || null, // TODO: hash password
                    role: role,
                    image_url: image_url || null, 
                }
            });

            if (role === 'Student') {
                const { program_id, department_id, intake_year, intake, status } = req.body;

                userType = 'Student';

                await tx.student.create({
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
                const { graduation_year, program_id, department_id, current_position, company } = req.body;

                userType = 'Alumni';

                await tx.alumni.create({
                    data: {
                        user_id: user_id,
                        current_position: current_position || null,
                        company: company || null,
                    }
                });

                await tx.alumniStudy.create({
                    data: {
                        alumni_id: user_id,
                        program_id: program_id,
                        department_id: department_id,
                        graduation_year: parseInt(graduation_year)
                    }
                })

            } else if (role === 'Admin') {
                const { permissions } = req.body;

                userType = 'Admin';

                await tx.admin.create({
                    data: {
                        user_id: user_id,
                        permissions: permissions,
                    }
                });
            }

        })
            
        res.status(201).json({ message: `User (${userType}) created successfully`, user_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await prisma.$disconnect(); 
    }
}

// PATCH: /api/users/:id - Update a user by ID. Updates only fields provided
export const updateUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params;

        if (isNaN(Number(id))) {
            res.status(404).json({ error: 'Invalid ID format' });
            return;
        }

        console.log('user id: ', id);   
        console.log("updateUser: ", req.body);


        // const { firstName, lastName, email, role, } = req.body;

        // const user = await prisma.user.create({
        //     data: {
        //         user_id: id,
        //         first_name: firstName,
        //         last_name: lastName,
        //         email: email,
        //         password: 'password',        // TODO: hash password
        //         role: role,
        //     }
        // });

        // if (role === 'Student') {
        //     const { program_id, department_id, intake_year, status } = req.body;

        //     await prisma.student.create({
        //         data: {
        //             user_id: id,
        //             program_id: program_id,
        //             department_id: department_id,
        //             intake_year: intake_year,
        //             status: status,
        //         }
        //     });
        // } else if (role === 'Alumni') {
        //     const { current_position, company } = req.body;

        //     await prisma.alumni.create({
        //         data: {
        //             user_id: id,
        //             current_position: current_position || null,
        //             company: company || null,   
        //         } as any
        //     });
        // }

        // res.status(201).json({ message: 'User updated successfully', user });
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

// DELETE /api/users/  - Delete multiple users by IDs
export const deleteUsersByIds = async (req: Request, res: Response) => {
    try {
        let { userIds } = await req.body;

        if (!Array.isArray(userIds) || userIds.length === 0) {
            res.status(400).json({ message: 'Invalid request - must provide an array of user IDs' });
            return 
        }

        const invalidIds = userIds.some(id => 
            typeof id !== 'string' && typeof id !== 'number'
        );

        if (invalidIds) {
            res.status(400).json({ message: 'Invalid ID format - all IDs must be strings or numbers' });
            return 
        }

        // userIds = Object.values(userIds);
        // console.log('userIds: ', userIds);

        if (!Array.isArray(userIds) || userIds.length === 0) {
            res.status(400).json({ message: 'Invalid request.' });
            return;
        }   

        const deleteResult = await prisma.user.deleteMany({
            where: {
                user_id: { in: userIds }      
            }   
        });

        if (deleteResult.count === 0) {
            res.status(404).json({ message: 'No users found with the provided IDs.' });
            return;
        }
        
        res.status(200).json({ 
            message: `User${userIds.length > 1 ? 's' : ''} deleted successfully! (${userIds.length})`,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error: error deleting users', error: error });   
        return;

    } finally {
        await prisma.$disconnect();
    }
};
