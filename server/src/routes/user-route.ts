import express from 'express';
import { getAllUsers, getUserById } from '../controllers/user-controller';


const router = express.Router();


// GET /api/users/ - Get all users
router.get('/', getAllUsers);

// GET /api/users/:id - Get a single user by ID
router.get('/:id', getUserById);


// module.exports = router;
export default router;