import express from 'express'
import { createChat, findChat, userChats } from '../controller/chatController.js';
const router = express.Router()

router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:userId/:hostId', findChat);

export default router