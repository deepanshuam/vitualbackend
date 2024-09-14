import { Router } from 'express';
import { getAdminStats } from '../controllers/admin.controller.js';
import { verifyJWT,isAdmin} from '../middleware/Auth.Middleware.js'; // JWT authentication middleware


const router = Router();

// Route to get admin stats (only accessible by admins)
router.get('/stats', verifyJWT, isAdmin, getAdminStats);

export default router;
