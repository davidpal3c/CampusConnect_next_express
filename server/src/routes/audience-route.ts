import express from 'express';
import { verifySession, adminRoute, validatePermissions } from '../middleware/user-middleware';
import { getAllAudience } from '../controllers/audience-controller';


const router = express.Router();

// GET /api/audience/ - Get all audience
router.get('/', verifySession, adminRoute, getAllAudience);


export default router;