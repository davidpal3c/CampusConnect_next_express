import { Request, Response } from 'express';
import { prisma } from '../config/prismaClient'

// GET /api/programs/ - Get all programs
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

// GET /api/programs/:id - Get program by ID
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
    }
}