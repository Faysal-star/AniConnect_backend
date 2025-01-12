import { Router } from 'express';
import postController from '../controllers/postController.js';

const router = Router();

router.post('/posts', postController.createPost);
router.get('/posts', postController.getPosts);

export default router;
