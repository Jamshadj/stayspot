import express from 'express';
import { createChat, hostChats, findChat } from '../controller/chatController.js';
import checkHost from '../middlewares/checkHost.js';

// Create an Express router instance
const router = express.Router();

// Endpoint to create a new chat
router.post('/', checkHost,createChat);

// Endpoint to get all chats of a specific host
router.get('/:hostId',checkHost, hostChats);

// Endpoint to find a chat between a user and a host
router.get('/find/:userId/:hostId',checkHost, findChat);

export default router;
