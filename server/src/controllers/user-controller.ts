// import model 
// import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';


export const getAllUsers = (req: Request, res: Response) => {

    const users = [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Alice Smith', age: 25 },
        { id: 3, name: 'David Lee', age: 32 },
    ];

    try {
        res.json(users);
    } catch (error) {
        console.log("error getting all users", error);
        res.status(500).json({ message: "Server Error", error: error });
    }

}

export const getUserById = (req: Request, res: Response) => {

    const users = [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Alice Smith', age: 25 },
        { id: 3, name: 'David Lee', age: 22 },
    ];

    const userId = parseInt(req.params.id);

    try {
        const user = users.find((user) => user.id === userId);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(`error getting user by id: ${userId}`, error);
        res.status(500).json({ message: "Server Error", error: error });
    }
}