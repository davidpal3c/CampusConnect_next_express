import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient';



// GET /api/audience/ - Get all audience
export const getAllAudience = async (req: Request, res: Response) => {
    try {
        let audience = {};

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

        const intakeSeasons = ["Winter", "Spring/Summer", "Fall"];

        // get all intake years from registered students
        const intakeYearsObj = await prisma.student.findMany({
            select: {
                intake_year: true
            },
            distinct: ['intake_year']
        });

        const intakeYears = intakeYearsObj.map((year) => year.intake_year);

        const userTypes = ["Students", "Prospective", "Alumni"];
    
        const audienceData = {
            departments, 
            programs, 
            intakeSeasons, 
            intakeYears,
            userTypes
        }

        // console.log("Audience Data: ", audienceData);

        res.status(200).json({ data: audienceData, message: 'Audience retrieved successfully!' });
    } catch (error) {
        res.status(500).send('Something went wrong retrieving Audience!');
    } finally {
        await prisma.$disconnect();
    }
};

