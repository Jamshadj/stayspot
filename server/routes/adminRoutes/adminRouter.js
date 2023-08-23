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
router.get('/properties',adminControllers.getProperties)
router.post('/property-status-update/:propertyId', adminControllers.postUpdateListingStatus);

router.get('/users',adminControllers.getUsers)
router.get('/hosts',adminControllers.getHosts)
router.get('/getWithdraw',adminControllers.getWithdraw)
router.post('/updatestatus',adminControllers.updateWithdrawStatus)
router.post('/addhost',adminControllers.postAddHost)
router.get('/bookings',adminControllers.getBookings)

router.get('/getUserById/:userId', adminControllers.getUserById);

router.get('/getBookingById/:bookingId', adminControllers.getBookingById);

export default router;   