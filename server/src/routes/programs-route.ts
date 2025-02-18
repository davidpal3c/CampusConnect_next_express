import express from 'express';
import { Request, Response } from 'express';
import { verifySession, validatePermissions } from '../middleware/user-middleware';
import { getAllPrograms, getProgramById,} from '../controllers/programs-controller';

const router = express.Router();

// GET /api/programs/ - Get all events
router.get('/', verifySession, getAllPrograms);

// GET /api/programs/:id - Get event by ID
router.get('/:id', verifySession, getProgramById);   


export default router;