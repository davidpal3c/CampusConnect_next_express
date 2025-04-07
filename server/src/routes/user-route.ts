import express from 'express';
import { getAllUsers, getUserById, getUserFieldsByRole, getStudentsByStatus, getMyUser, 
    createUser, updateUser, deleteUser, deleteUsersByIds } from '../controllers/user-controller';
import { verifySession, adminRoute, validatePermissions } from '../middleware/user-middleware';


const router = express.Router();


// GET /api/users/ - Get all users
router.get('/', verifySession, adminRoute, validatePermissions(['Read-Only', 'Read-Write', 'Full Access']), getAllUsers);

// GET /api/users/me - Get current user
router.get('/me', verifySession, getMyUser);

// GET /api/users/:id - Get a single user by ID
router.get('/:id', verifySession, adminRoute, validatePermissions(['Read-Write', 'Full Access']), getUserById);

// GET /api/users/role/:role - Get user fields by role
router.get('/roles/:role', verifySession, adminRoute, validatePermissions(['Read-Only', 'Read-Write', 'Full Access']), getUserFieldsByRole);

// GET /api/users/students/:status - Get students by status
router.get('/students/:status', verifySession, adminRoute, validatePermissions(['Read-Only', 'Read-Write', 'Full Access']), getStudentsByStatus);

// POST: /api/users/ - Create a new user
router.post('/', verifySession, adminRoute, validatePermissions(['Read-Write', 'Full Access']), createUser);

// PATCH /api/users/:id - Update a user by ID. This is a partial update
// router.patch('/:id', verifySession, validatePermissions, updateUser);

// PUT /api/users/:id - Update a user by ID. This is a full update
router.put('/:id', verifySession, adminRoute, validatePermissions(['Full Access']), updateUser);

// DELETE /api/users/:id - Delete a user by ID
router.delete('/:id', verifySession, adminRoute, validatePermissions(['Full Access']), deleteUser);

// DELETE /api/users/ - Delete multiple users by IDs
router.delete('/', verifySession, adminRoute, validatePermissions(['Full Access']), deleteUsersByIds);

// module.exports = router;
export default router;