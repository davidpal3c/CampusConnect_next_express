import { Router, RequestHandler} from 'express';
import { loginAdmin, checkSession, logout } from '../controllers/adminAuth-controller';
import { protectRoute, adminRoute, setCustomClaims, verifySession, setUserImage } from '../middleware/adminAuth-middleware';

const router = Router();

router.post('/login-admin', protectRoute, adminRoute, setCustomClaims, setUserImage, loginAdmin as RequestHandler);
router.post('/session-admin', verifySession, adminRoute, setCustomClaims, checkSession as RequestHandler);
router.post('/logout-admin', logout);
// router.post('/register', loginAdmin as RequestHandler);
// router.post('/forgot-password', forgotPassword);

export default router; 