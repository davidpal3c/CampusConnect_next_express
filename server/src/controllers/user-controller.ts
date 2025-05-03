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
                Admin: {
                    select: {
                        user_id: true,
                        permissions: true,
                    }
                },
                Alumni: {
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
                } 
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

        // console.log(req.body)
        let userType = 'User';

        const emailExists: any = await prisma.user.findUnique({ where: { email: email } });
        if (emailExists) {
            res.status(409).json({ error: 'User with same email already exists' });
            return;
        }

        const idExists: any = await prisma.user.findUnique({ where: { user_id: user_id } });
        if (idExists) {
            res.status(409).json({ error: 'User ID already exists' });
            return;
        }

        await prisma.$transaction(async (tx) => {

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
            res.status(400).json({ error: 'Invalid ID format' });
            return;
        }

        const { user_id, first_name, middle_name, last_name, email, role, image_url } = req.body;
        let userType = 'User';

        if (id !== user_id) {
            let idExists = await prisma.user.findUnique({
                where: { user_id: id },
            });

            if (idExists) {
                res.status(404).json({ error: `User with id: ${user_id} already exists.` });
                return;
            }
        }

        if (email) {
            const emailExists: any = await prisma.user.findFirst({
                where: { 
                    email: email,
                    NOT: { user_id: id }                                                                                // Exclude the current user ID from the check (to avoid falsely claim the email is taken.)
                                                                                                                        // Equivalent to SQL: WHERE email = 'test@example.com' AND user_id != '123'
                },
            });

            if (emailExists) {
                res.status(404).json({ error: `User with email: ${email} already exists.` });
                return;
            }
        }

        await prisma.$transaction(async (tx) => {

            const updateExistingUser: any = {};

            if (user_id) updateExistingUser.user_id = user_id;
            if (first_name) updateExistingUser.first_name = first_name;
            if (middle_name) updateExistingUser.middle_name = middle_name;
            if (last_name) updateExistingUser.last_name = last_name;
            if (email) updateExistingUser.email = email;
            if (role) updateExistingUser.role = role;
            if (image_url) updateExistingUser.image_url = image_url;
            // if (password) updateExistingUser.password = password; // TODO: hash password


            await tx.user.update({
                where: { user_id: id },
                data: updateExistingUser,
            });

            if (role === 'Student') {
                const { program_id, department_id, intake_year, intake, status } = req.body;
                userType = 'Student';
                const updateStudentData: any = {};  

                updateExistingUser.user_id = user_id;
                if (program_id) updateStudentData.program_id = program_id;
                if (department_id) updateStudentData.department_id = department_id;
                if (intake_year) updateStudentData.intake_year = intake_year;
                if (intake) updateStudentData.intake = intake;
                if (status) updateStudentData.status = status;

                await tx.student.update({
                    where: { user_id: id },
                    data: updateStudentData,
                });

            } 
            else if (role === 'Alumni') {
                
                const { graduation_year, program_id, department_id, current_position, company } = req.body;
                userType = 'Alumni';

                const updateAlumniData: any = {};
                const updateAlumniStudyData: any = {};

                // if (current_position) updateAlumniData.current_position = current_position;
                // if (company) updateAlumniData.company = company;

                if (current_position !== undefined) updateAlumniData.current_position = current_position;
                if (company !== undefined) updateAlumniData.company = company;

                if (user_id && user_id !== id) {
                    updateAlumniData.user_id = user_id;

                    const existingStudies = await tx.alumniStudy.findMany({
                        where: { alumni_id: id },
                    });

                    await Promise.all(existingStudies.map(async (study) => {

                        const duplicateExists = await tx.alumniStudy.findFirst({
                            where: {
                                alumni_id: user_id,
                                program_id: program_id || study.program_id,
                            }
                        })

                        if (!duplicateExists) {
                            await tx.alumniStudy.create({
                                data: {
                                    ...study,                                       // Copy existing study data 
                                    id: undefined,                                  // Reset the ID to create a new record
                                    alumni_id: user_id,
                                    program_id: program_id || study.program_id,
                                    department_id: department_id || study.department_id,
                                    graduation_year: graduation_year ? parseInt(graduation_year) : study.graduation_year,
                                }
                            })
                        }

                        await tx.alumniStudy.delete({
                            where: { id: study.id }
                        })
                    }))
                } else {
                    // normal update (no ID change)
                    
                    if (program_id && department_id && graduation_year) {

                        const studyToUpdate = await tx.alumniStudy.findFirst({
                            where: {
                                alumni_id: id,
                                program_id: program_id,
                                department_id: department_id
                            }
                        });
            
                        if (studyToUpdate) {
                            if (program_id) updateAlumniStudyData.program_id = program_id;
                            if (department_id) updateAlumniStudyData.department_id = department_id;
                            if (graduation_year) updateAlumniStudyData.graduation_year = parseInt(graduation_year);
                        
                            await tx.alumniStudy.update({
                                where: { id: studyToUpdate.id },
                                data: updateAlumniStudyData
                            })

                        } else if (graduation_year) {
                            // Create new study only if all required fields exist
                            await tx.alumniStudy.create({
                                data: {
                                    alumni_id: id,
                                    program_id: program_id,
                                    department_id: department_id,
                                    graduation_year: parseInt(graduation_year)
                                }
                            });
                        }
                    }
                }

                await tx.alumni.update({
                    where: { user_id: id },
                    data: updateAlumniData,
                });

            }

            // FOR ONLY TESTING PURPOSES: SINGLE STUDY RECORD PER ALUMNI USER (CASE)
            // else if (role === 'Alumni') {
            //     console.log("request role", role);
                
            //     const { graduation_year, program_id, department_id, current_position, company } = req.body;
            //     userType = 'Alumni';

            //     // if (!graduation_year || isNaN(parseInt(graduation_year))) {
            //     //     throw new Error('Valid graduation year is required');
            //     // }

            //     const updateAlumniData: any = {};
            //     const updateAlumniStudyData: any = {};

            //     // if (current_position) updateAlumniData.current_position = current_position;
            //     // if (company) updateAlumniData.company = company;

            //     if (current_position !== undefined) updateAlumniData.current_position = current_position;
            //     if (company !== undefined) updateAlumniData.company = company;

            //     if (user_id && user_id !== id) {
            //         updateAlumniData.user_id = user_id;

            //         const existingStudy = await tx.alumniStudy.findFirst({
            //             where: { alumni_id: id },
            //         });

            //         if (existingStudy) {
            //             await tx.alumniStudy.delete({
            //                 where: { alumni_id: existingStudy.id}
            //             } as any ) 
                        
            //             await tx.alumniStudy.create({
            //                 data: {
            //                     ...existingStudy,                                       // Copy existing study data 
            //                     id: undefined,                                          // Reset the ID to create a new record
            //                     alumni_id: user_id,
            //                     program_id: program_id || existingStudy.program_id,
            //                     department_id: department_id || existingStudy.department_id,
            //                     graduation_year: graduation_year ? parseInt(graduation_year) : existingStudy.graduation_year,
            //                 }
            //             })
            //         }
            //     } else {
            //         if (program_id) updateAlumniStudyData.program_id = program_id;
            //         if (department_id) updateAlumniStudyData.department_id = department_id;
            //         if (graduation_year) updateAlumniStudyData.graduation_year = parseInt(graduation_year);

            //         const existingStudy = await tx.alumniStudy.findFirst({
            //             where: { alumni_id: id },
            //         })

            //         if (existingStudy) {
            //             await tx.alumniStudy.update({
            //                 where: { id: existingStudy.id },
            //                 data: updateAlumniStudyData
            //             })

            //         } else {
            //             await tx.alumniStudy.create({
            //                 data: {
            //                     alumni_id: id,
            //                     ...updateAlumniStudyData
            //                 }
            //             })
            //         }   

            //     }

            //     await tx.alumni.update({
            //         where: { user_id: id },
            //         data: updateAlumniData,
            //     });

            // }
        })

        res.status(200).json({ message: `User updated successfully` });

    } catch (error) {
        console.error('Update error:', error);
        const message = error instanceof Error ? error.message : 'Internal server error';
        res.status(500).json({ error: message });
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
