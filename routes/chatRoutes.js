import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

router.post('/recommend', chatController.getRecommendations);
router.post('/continue', chatController.continueChat);
router.get('/history/:uid', chatController.getChatHistory);

export default router;
