import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

router.post('/recommend', chatController.getRecommendations);

export default router;
