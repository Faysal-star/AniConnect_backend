import { Router } from 'express';
import { updateUser, getProfile } from '../controllers/userController.js';

const router = Router();

router.put('/users', updateUser);
router.get('/users/:userId', getProfile);

export default router;
