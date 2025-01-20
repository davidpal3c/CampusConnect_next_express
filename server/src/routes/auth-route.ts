import { Router, RequestHandler} from 'express';
import { loginAdmin, checkSession, logout } from '../controllers/auth-controller';
import { protectRoute, adminRoute, setCustomClaims, verifySession } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', protectRoute, adminRoute, setCustomClaims, loginAdmin as RequestHandler);
router.post('/session', verifySession, adminRoute, setCustomClaims, checkSession as RequestHandler);
router.post('/logout', logout);
// router.post('/register', loginAdmin as RequestHandler);
// router.post('/forgot-password', forgotPassword);

export default router; 