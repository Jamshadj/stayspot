import  express  from "express";
import { addMessage, createChat, findChat, getMessages, userChats } from "../controller/chatController.js";

const router=express.Router()

router.post('/',createChat)
router.get('/:userId',userChats)
router.get('/find/:firstId/:secondId',findChat)

router.post('/message',addMessage)
router.get('/messages/:chatId',getMessages)


export default router