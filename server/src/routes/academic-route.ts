import express from 'express';
import { Request, Response } from 'express';
import { verifySession, adminRoute, validatePermissions } from '../middleware/user-middleware';
import { getAllPrograms, getProgramById, getAllStudyOptions} from '../controllers/academic-controller';

const router = express.Router();

// GET /api/academic/ - Get all events
router.get('/', verifySession, getAllPrograms);

// GET /api/academic/:id - Get event by ID
router.get('/programs/:id', verifySession, getProgramById);   

// GET /api/academic/options - get all programs, departments, and intake registers
router.get('/options', verifySession, adminRoute, validatePermissions(['Read-Write', 'Full Access']), getAllStudyOptions);


export default router;