import { Router } from 'express';
import { createPost, getPosts } from '../controllers/postController.js';

const router = Router();

router.post('/posts', createPost);
router.get('/posts', getPosts);

export default router;
