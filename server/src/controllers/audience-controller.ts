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

        const intakeSeasons = ["Fall", "Winter", "Spring", "Summer"];

        // get all intake years from registered students
        const intakeYears = await prisma.student.findMany({
            select: {
                intake_year: true
            },
            distinct: ['intake_year']
        });

        const audienceData = {
            departments, 
            programs, 
            intakeSeasons, 
            intakeYears
        }

        console.log("Audience Data: ", audienceData);

        res.status(200).json({ data: audienceData, message: 'Audience retrieved successfully!' });
    } catch (error) {
        res.status(500).send('Something went wrong retrieving Audience!');
    }
};