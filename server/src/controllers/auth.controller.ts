
export interface AuthenticatedRequest extends Request {
    user?: any; // Add user property to Request object
  }

export const login = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const users = [
            { id: 1, name: 'John Doe', age: 30 },
            { id: 2, name: 'Alice Smith', age: 25 },
            { id: 3, name: 'David Lee', age: 32 },
        ];

        res.user = users.find((user) => user.id === 1); 

        const user = req.user; // Access authenticated user information
        res.json({
            message: 'Profile data retrieved successfully',
            user,  // Send the user's decoded token data (mocked in this case)
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};