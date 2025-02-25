import { Router, RequestHandler} from 'express';
import { loginUser, checkSession, logout } from '../controllers/userAuth-controller';
import { protectRoute, userRoute, setCustomClaims, verifySession, setUserImage } from '../middleware/userAuth-middleware';

const router = Router();

router.post('/login-user', protectRoute, userRoute, setCustomClaims, setUserImage, loginUser as RequestHandler);
router.post('/session-user', verifySession, userRoute, setCustomClaims, checkSession as RequestHandler);
router.post('/logout-user', logout);
// router.post('/register', loginAdmin as RequestHandler);
// router.post('/forgot-password', forgotPassword);

export default router; 