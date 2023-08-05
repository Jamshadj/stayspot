import Express from "express";
import userAuth from "../../controller/userControllers/userAuthController.js";
import userPropertyController from "../../controller/userControllers/userPropertyController.js";
 
const router = Express.Router();


router.post('/signup',userAuth.postSignUp)
router.post('/otp',userAuth.postOtpVerify)
router.post('/login',userAuth.postLogIn)
router.post('/logout',userAuth.userLogout)
router.get('/getListings',userPropertyController.getListings)
router.get('/getListingById/:propertyId',userPropertyController.getListingById)
router.get('/getHostById/:hostId', userPropertyController.getHostById);
router.get('/auth',userAuth.getLoggedInUser)
router.post("/auth/login/google" , userAuth.googleAuth)
router.post("/checkout" , userPropertyController.postCheckout)
export default router;
