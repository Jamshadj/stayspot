import Express from "express";
import userAuth from "../../controller/userControllers/userAuthController.js";

const router = Express.Router();


router.post('/signup',userAuth.postSignUp)
router.post('/otp',userAuth.postOtpVerify)
router.post('/login',userAuth.postLogIn)
router.post('/logout',userAuth.userLogout)
router.get('/auth',userAuth.getLoggedInUser)
router.post("/auth/login/google" , userAuth.googleAuth)
export default router;
