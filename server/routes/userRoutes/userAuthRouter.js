import Express from 'express';
import userAuthController from '../../controller/userControllers/userAuthController.js';
import userPropertyController from '../../controller/userControllers/userPropertyController.js';
import paymentController from '../../controller/paymentController.js';

const router = Express.Router();

// User authentication routes
router.post('/signup', userAuthController.postSignUp);
router.post('/otp', userAuthController.postOtpVerify);
router.post('/login', userAuthController.postLogIn);
router.post('/logout', userAuthController.userLogout);
router.get('/auth', userAuthController.getLoggedInUser);

router.post('/auth/login/google', userAuthController.googleAuth);

router.patch('/updatephonemunber',userAuthController.userPhoneNumber)

// User property routes
router.get('/getListings', userPropertyController.getListings);
router.get('/getListingById/:propertyId', userPropertyController.getListingById);
router.get('/getHostById/:hostId', userPropertyController.getHostById);

// Payment routes
router.post('/payment', paymentController.paymentOrder);
router.post('/payment/verify', paymentController.paymentVerify);
router.get('/order-success', paymentController.getOrderSucess);
router.post('/checkout', paymentController.postCheckout);

// Booking 
router.get('/booking',userAuthController.getBookingById)

router.post('/addToWishList',userPropertyController.addToWishList)
router.post('/removeFromWishList',userPropertyController.removeFromWishList)
router.get('/getWishList',userPropertyController.getWishList)
router.get('/getWishLists/:userId',userPropertyController.getWishLists)


router.post('/updateDetails/:userId',userAuthController.updateDetails)

router.get('/getReservations/:userId',userPropertyController.getReservationsById)
// router.get('/getMatchingListings',userPropertyController.getMatchingListings)
export default router;
