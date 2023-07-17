import  Express  from "express";
import adminControllers from "../../controller/adminControllers/adminControllers.js";
const router=Express.Router();

router.post('/login',adminControllers.postLogIn)
router.post('/blockuser',adminControllers.postBlockUser)
router.post('/unblockuser',adminControllers.postUnBlockUser)
router.post('/blockhost',adminControllers.postBlockHost)
router.post('/unblockhost',adminControllers.postUnBlockHost)
router.post('/logout',adminControllers.adminLogout)
router.get('/auth',adminControllers.getLoggedInAdmin)

router.get('/users',adminControllers.getUsers)
router.get('/hosts',adminControllers.getHosts)
export default router; 