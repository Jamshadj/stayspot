import Express from "express";
import hostAuth from "../controller/hostAuthControllers.js";
import hostPropertyControllers from "../controller/hostPropertyControllers.js";
import checkHost from "../middlewares/checkHost.js";

const router = Express.Router();
// Authentication Routes
router.post('/signup', hostAuth.postSignUp);
router.post('/otp', hostAuth.postOtpVerify);
router.post('/login', hostAuth.postLogIn);
router.post('/logout', hostAuth.hostLogout);
router.get('/auth', hostAuth.getLoggedInHost);
router.post("/auth/login/google", hostAuth.googleAuth);

// Property Routes
router.post('/add-property',checkHost, hostPropertyControllers.postAddProperty);
router.post('/set-date',checkHost, hostPropertyControllers.setDates);
router.get('/properties/:hostId',checkHost, hostPropertyControllers.getProperties);
router.get('/property/:propertyId',checkHost, hostPropertyControllers.getProperty);
router.post('/edit-data',checkHost, hostPropertyControllers.postPropertyEditBasics);
router.post('/update-property-field',checkHost, hostPropertyControllers.postPropertyEditProperty);
router.post('/update-price',checkHost, hostPropertyControllers.postPropertyEditPrice);

// Booking Routes
router.get('/getBookingById/:hostId',checkHost, hostPropertyControllers.getBookingByHostId);
router.post('/updatestatus/:bookingId',checkHost, hostPropertyControllers.updateBookingStatus);

// Withdraw Routes
router.post('/withdraw',checkHost, hostPropertyControllers.withdrawRequest);
router.get('/withdraw/:hostId',checkHost, hostPropertyControllers.getWithdrawById);


export default router;
