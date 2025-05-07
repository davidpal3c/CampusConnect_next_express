import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient'

// GET /api/academic/ - Get all programs
export const getAllPrograms = async (req: Request, res: Response) => {
    try {
        const programs = await prisma.program.findMany(); 

        if(programs.length === 0) {
            res.status(404).json({ error: 'No programs found in the database (array)' });
            return;
        }

        if (!programs) {
            res.status(404).json({ error: 'No programs found in the database' });
            return;
        }

        res.json(programs);
    } catch (error) {
        console.log("error getting all programs", error);
        res.status(500).json({ message: "Server Error: could not fetch programs", error: error });
    } finally {
        await prisma.$disconnect(); 
    }
}   

// GET /api/academic/options
export const getAllStudyOptions = async (req: Request, res: Response) => {
    try {
        const programsAndDepartments = await prisma.program.findMany({
            include: {
                Department: {
                    select: {
                        name: true
                    }
                }
            }
        });

        // console.log("programsAndDepartments: ", programsAndDepartments);

        if (programsAndDepartments.length === 0 || !programsAndDepartments) {
            res.status(404).json({ error: 'No programs or departments found in the database' });
            return;
        }
        res.status(200).json(programsAndDepartments);
        return;

    } catch (error) {
        res.status(500).json({ error: 'Internal server error: Study options could not be fetched' });
    }
}


// GET /api/academic/programs/:id - Get program by ID
export const getProgramById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { id } = req.params;
        const program = await prisma.program.findUnique({
            where: { program_id: id }
        });

        if (!program) {
            res.status(404).json({ error: 'Program not found in the database' });
            return;
        }

        res.status(200).json(program);
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error: Program could not be fetched' });
        return;
    } finally {
        await prisma.$disconnect(); 
    }
}




// GET /api/studyData/available-enrollment-data/ - get all programs, departments, and intake registers
export const getAvailableStudyEnrollmentData = async (req: Request, res: Response) => {
    try {
        const departments = await prisma.department.findMany({
            select: {
                department_id: true,
                name: true
            }
        });

        const programs = await prisma.program.findMany({
            select: {
                program_id: true,
                name: true
            }
        });

        const intakeSeasons = ["Fall", "Winter", "Spring", "Summer"];

        let intakeYears = []

        intakeYears[0] = new Date().getFullYear() - 3;

        for (let i = 1; i < 6; i++) {
            intakeYears.push(intakeYears[i - 1] + 1);
        }
    
        const studyRegisterData = {
            programs, 
            departments, 
            intakeSeasons, 
            intakeYears,
        }

        // console.log("Audience Data: ", audienceData);

        res.status(200).json({ data: studyRegisterData, message: 'Study enrollment data retrieved successfully!' });
    } catch (error) {
        res.status(500).send('Something went wrong retrieving study enrollment data!');
    } finally {
        await prisma.$disconnect();
    }
}   