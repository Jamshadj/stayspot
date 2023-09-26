import Express from 'express';
import userAuthController from '../controller/userAuthController.js';
import userPropertyController from '../controller/userPropertyController.js';
import paymentController from '../controller/paymentController.js';
import checkUser from '../middlewares/checkUser.js';

const router = Express.Router();

// User authentication routes
router.post('/signup',userAuthController.postUserSignUp);
router.post('/otp', userAuthController.postUserOtpVerify);
router.post('/login', userAuthController.postUserLogIn);
router.post('/logout', userAuthController.userLogout);
router.get('/auth', userAuthController.getLoggedInUser);
router.post('/auth/login/google', userAuthController.userGoogleAuth);
router.patch('/updatePhoneNumber', userAuthController.userPhoneNumber);
router.post('/updateDetails/:userId', userAuthController.updateUserDetails);
router.post('/updateProfile/:userId', userAuthController.updateUserProfile);
router.post('/forgotpassword', userAuthController.forgotUserPassword);
router.post('/verifyotp', userAuthController.verifyUserOTP);
router.patch('/updatepassword', userAuthController.postUpdateUserPassword);

// User property routes
router.get('/getListings', userPropertyController.getListings);
router.get('/getListingById/:propertyId', userPropertyController.getListingById);
router.get('/getHostById/:hostId', userPropertyController.getHostById);

// Payment routes
router.post('/payment', checkUser, paymentController.paymentOrder);
router.post('/payment/verify', checkUser, paymentController.paymentVerify);
router.get('/order-success',  paymentController.getOrderSuccess);
router.post('/checkout', checkUser, paymentController.postCheckout);

// Booking
router.get('/getReservations/:userId', checkUser, userPropertyController.getReservationsById);
router.get('/booking',checkUser, userAuthController.getBookingById);
router.get('/getBookingByPropertyId/:propertyId', userPropertyController.getBookingByPropertyId);

// Wishlist
router.post('/addToWishList',checkUser, userPropertyController.addToWishList);
router.post('/addReview',checkUser, userPropertyController.addReview);
router.post('/removeFromWishList',checkUser, userPropertyController.removeFromWishList);
router.get('/getWishlist/:userId',checkUser, userPropertyController.getWishList);

export default router;
