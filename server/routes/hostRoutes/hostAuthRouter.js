import Express from "express";
// import hostAuth from "../../controller/hostControllers/hostAuthControllers";
import hostAuth from "../../controller/hostControllers/hostAuthControllers.js";
import hostPropertyControllers from "../../controller/hostControllers/hostPropertyControllers.js";
const router = Express.Router();


router.post('/signup',hostAuth.postSignUp)
router.post('/otp',hostAuth.postOtpVerify)
router.post('/login',hostAuth.postLogIn)
router.post('/logout',hostAuth.hostLogout)
router.get('/auth',hostAuth.getLoggedInHost)
router.post("/auth/login/google" , hostAuth.googleAuth)
router.post('/add-property',hostPropertyControllers.postAddProperty)
router.post('/set-date',hostPropertyControllers.setDates)
router.get('/properties/:hostId', hostPropertyControllers.getProperties);
router.get('/property/:propertyId', hostPropertyControllers.getProperty);
router.post('/edit-data',hostPropertyControllers.postPropertyEditBasics)
export default router;