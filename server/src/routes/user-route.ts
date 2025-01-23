import express from 'express';
import { getAllUsers, getUserById } from '../controllers/user-controller';
import { verifySession, protectRoute } from '../middleware/user-middleware';


const router = express.Router();


// GET /api/users/ - Get all users
router.get('/', verifySession, protectRoute, getAllUsers);

// GET /api/users/:id - Get a single user by ID
router.get('/:id', verifySession, protectRoute, getUserById);


// module.exports = router;
export default router;