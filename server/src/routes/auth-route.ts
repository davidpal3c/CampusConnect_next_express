import { Router, RequestHandler} from 'express';
import { login } from '../controllers/auth-controller';
// import { authenticateUser } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login as RequestHandler);


export default router; 