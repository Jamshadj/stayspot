
import sentOTP from "../../helper/sentOTP.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import hostModel from "../../models/hostModel.js";
import userModel from "../../models/userModel.js";
import axios from "axios";


// Helper function to create a token
const createToken = (hostId) => {
  return jwt.sign({ id: hostId }, "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
};

export default {
  postSignUp: async (req, res) => {
    try {
      console.log("hello");
      const existingEmail = await hostModel.findOne({ email: req.body.email });
      if (existingEmail) {
        res.json({ err: true, message: 'Host already exists' });
      } else if (
        !req.body.firstName.trim() ||
        !req.body.lastName.trim() ||
        !req.body.email.trim() ||
        !req.body.phoneNumber.trim() ||
        !req.body.password.trim()
      ) {
        res.json({ err: true, message: 'Fields cannot be empty' });
      } else if (req.body.password !== req.body.confirmPassword) {
        res.json({ err: true, message: 'Passwords do not match' });
      } else {
        let otp = Math.ceil(Math.random() * 10000);
        console.log(otp);
        let otpSent = await sentOTP(req.body.email, otp);

        const signUpToken = jwt.sign(
          {
            otp: otp
          },
          "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa"
        );

        res.cookie("signUpToken", signUpToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 10,
          sameSite: "none",
        }).json({ err: false, message: 'OTP sent successfully' });
      }
    } catch (error) {
      console.log(error); // Log the error to the console
      res.json({ err: true, message: error.message });
    }
  },

  postOtpVerify: async (req, res) => {
    try {
      let otp = req.body.otp;
      let hostToken = req.cookies.signUpToken;
     
      const OtpToken = jwt.verify(
        hostToken,
        "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa"
      );
      console.log("xe",otp);
      console.log(OtpToken.otp);
      let bcrypPassword = await bcrypt.hash(req.body.password, 10);
      console.log(bcrypPassword);
      if (otp == OtpToken.otp) {
        let host = await hostModel.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: bcrypPassword,
          blocked: false
        });        
        console.log(host);
        const hostToken = createToken(host._id)
        return res.cookie("hostToken", hostToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
        }).json({ err: false, message: 'host registration success' });
      } else {
        res.json({ err: true, message: 'Check otp' });
      }
    } catch (error) {
      console.log(error); // Log the error to the console
      res.json({ err: true, message: error.message });
    }
  },
  
  getLoggedInHost: async (req, res) => {
    try {
      const token = req.cookies.hostToken; // Corrected cookie name
      if (!token) {
        return res.json({ loggedIn: false, error: true, message: "no token" });
      }
      console.log("rd");
      const verifiedJWT = jwt.verify(token, "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
      const host = await hostModel.findById(verifiedJWT.id, { password: 0 });
      console.log(host);
      if (!host) {
        return res.json({ loggedIn: false, error: true, message: "Host not found" });
      }
      if (host.blocked) {
        return res.json({ loggedIn: false, error: true, message: "Host is blocked" });
      }
      
      return res.json({ loggedIn: true, host, token });
    } catch (err) {
      console.log(err);
      res.json({ loggedIn: false, error: true, message: err.message });
    }
  },
  
  postLogIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingHost = await hostModel.findOne({ email: email });
      if (existingHost) {
        if (existingHost.blocked === true) {
          return res.json({ err: true, message: 'Sorry, you are banned' });
        } else if (bcrypt.compareSync(password, existingHost.password)) {
          const token = createToken(existingHost._id)
          return res.cookie("hostToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
          }).json({ err: false, message: 'Host login success' });
        } else {
          return res.json({ err: true, message: 'Incorrect password' });
        }
      } else {
        return res.json({ err: true, message: 'Email does not exist' });
      }
    } catch (error) {
      console.log(error); // Log the error to the console
      res.json({ err: true, message: error.message });
    }
  }, googleAuth: async (req, res) => {
    console.log("auth controller");
    try {

      if (req.body.access_token) {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`);
        // Checking if the host exists
        const host = await hostModel.findOne({ googleId: response.data.id, loginWithGoogle: true }, { password: 0 });
        if (host) {
          // Check if the host is banned or not
          if (!host.blocked) {
            const token = createToken(host._id);
            return res.cookie("hostToken", token, {
              httpOnly: true,
              secure: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
              sameSite: "none",
            }).json({ created: true, host, token, message: "Login Success" });
          } else {
            return res.status(200).json({ host, message: "Sorry, you are banned!" });
          }
        } else {
          let bcrypPassword = await bcrypt.hash(response.data.id, 10);
          // If the host does not exist, create a new account
          const newHost = await hostModel.create({
            googleId: response.data.id,
            firstName: response.data.given_name,
            lastName: response.data.family_name,
            email: response.data.email,
            image:response.data.picture,
            loginWithGoogle: true,
            password: bcrypPassword,
          });

          // Create a token after creating the new host
          const token = createToken(newHost._id);

          return res.cookie("hostToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
          }).json({ created: true, host: newHost, token, message: "Signup Success" });
        }
      } else {
        return res.status(401).json({ message: "Not authorized" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ created: false, message: "Internal server error" });
    }
  },
  hostLogout: async (req, res) => {
    console.log("hostlogout ");
    return res.cookie("hostToken", '', {
        httpOnly: true,
        secure: true,
        maxAge: 0, // Set the maxAge to 0 to expire the cookie immediately
        sameSite: "none",
    }).json({ err: false, message: 'Logged out successfully' });
}
};
