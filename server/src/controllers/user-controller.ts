// import model 
// import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../config/prismaClient';


export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const users = await prisma.user.findMany(); 
        res.json(users);
    } catch (error) {
        console.log("error getting all users", error);
        res.status(500).json({ message: "Server Error", error: error });
    } finally {
        await prisma.$disconnect(); 
    }

}

export const getUserById = async (req: Request, res: Response) : Promise<void> => {

    try {
        const { id } = req.params; 

        if (isNaN(Number(id))) {
            res.status(404).json({ error: 'Invalid ID format' });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { user_id: id }, // Will need to change this to parse to Int if we decide to use a number for the user_id for auto increment
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