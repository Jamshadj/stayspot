import Express from "express";
import adminControllers from "../controller/adminController.js";
import checkAdmin from "../middlewares/checkAdmin.js";

// Create an Express router instance
const router = Express.Router();

// Admin authentication and session endpoints
router.post('/login', adminControllers.postLogIn);
router.get('/auth', adminControllers.getLoggedInAdmin);

// User and host management endpoints
router.post('/blockuser',checkAdmin, adminControllers.postBlockUser);
router.post('/unblockuser', checkAdmin, adminControllers.postUnBlockUser);
router.post('/blockhost',checkAdmin,  adminControllers.postBlockHost);
router.post('/unblockhost',checkAdmin,  adminControllers.postUnBlockHost);
router.get('/users',checkAdmin,  adminControllers.getUsers);
router.get('/hosts',checkAdmin,  adminControllers.getHosts);

// Property management endpoints
router.get('/properties',checkAdmin, adminControllers.getProperties);
router.post('/property-status-update/:propertyId',checkAdmin, adminControllers.postUpdateListingStatus);

// Withdrawal management endpoints
router.get('/getWithdraw',checkAdmin, adminControllers.getWithdraw);
router.post('/updatestatus',checkAdmin, adminControllers.updateWithdrawStatus);

// Host registration and booking management endpoints
router.post('/addhost',checkAdmin, adminControllers.postAddHost);
router.get('/bookings',checkAdmin, adminControllers.getBookings);

// Get user and booking details by their IDs
router.get('/getUserById/:userId',checkAdmin, adminControllers.getUserById);
router.get('/getBookingById/:bookingId', adminControllers.getBookingById);

export default router;
