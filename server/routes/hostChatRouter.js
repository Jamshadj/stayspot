import express from 'express'
import { createChat, hostChats, findChat } from '../controller/chatController.js';
const router = express.Router()

router.post('/', createChat);
router.get('/:hostId', hostChats);
router.get('/find/:userId/:hostId', findChat);

export default router