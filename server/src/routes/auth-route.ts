import { Router, RequestHandler} from 'express';
import { loginAdmin } from '../controllers/auth-controller';
// import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', loginAdmin as RequestHandler);


export default router; 