import userModel from "../../models/userModel.js";
import sentOTP from "../../helper/sentOTP.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import axios from "axios";
import cloudinary from '../../helper/config.js';
import bookingModel from "../../models/bookingModel.js";
import otpGenerator from 'otp-generator';
// Helper function to create a token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
};
let storedOtp=null;

export default {
  postSignUp: async (req, res) => {
    try {
      const existingEmail = await userModel.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.json({ err: true, message: 'User already exists' });
      } else if (
        !req.body.firstName.trim() ||
        !req.body.lastName.trim() ||
        !req.body.email.trim() ||
        !req.body.password.trim()
      ) {
        return res.json({ err: true, message: 'Fields cannot be empty' });
      } else if (req.body.password !== req.body.confirmPassword) {
        return res.json({ err: true, message: 'Passwords do not match' });
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
      console.log(error);
      res.json({ err: true, message: error.message });
    }
  },

  postOtpVerify: async (req, res) => {
    try {
      let otp = req.body.otp;
      let userToken = req.cookies.signUpToken;

      const OtpToken = jwt.verify(
        userToken,
        "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa"
      );
      let bcrypPassword = await bcrypt.hash(req.body.password, 10);
      console.log(bcrypPassword);
      if (otp == OtpToken.otp) {
        let user = await userModel.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: bcrypPassword,
          blocked: false
        });

        const userToken = createToken(user._id);

        return res.cookie("userToken", userToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          sameSite: "none",
        }).json({ err: false, message: 'User registration success' });
      } else {
        res.json({ err: true, message: 'Check otp' });
      }
    } catch (error) {
      console.log("error", error);
      res.json({ err: true, message: error.message });
    }
  },

  getLoggedInUser: async (req, res) => {
    try {
      const token = req.cookies.userToken;
      if (!token) {
        return res.json({ loggedIn: false, error: true, message: "No token" });
      }
      const verifiedJWT = jwt.verify(token, "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");


      const user = await userModel.findById(verifiedJWT.id, { password: 0 });

      if (!user) {
        return res.json({ loggedIn: false, error: true, message: "User not found" });
      }
      if (user.blocked) {
        return res.json({ loggedIn: false, error: true, message: "User is blocked" });
      }

      return res.json({ loggedIn: true, user, token });
    } catch (err) {
      console.log(err);
      res.json({ loggedIn: false, error: true, message: err.message });
    }
  },

  postLogIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        if (existingUser.blocked === true) {
          return res.json({ err: true, message: 'Sorry, you are banned' });
        } else if (bcrypt.compareSync(password, existingUser.password)) {
          const token = createToken(existingUser._id);

          return res.cookie("userToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
          }).json({ err: false, message: 'User login success' });
        } else {
          return res.json({ err: true, message: 'Incorrect password' });
        }
      } else {
        return res.json({ err: true, message: 'Email does not exist' });
      }
    } catch (error) {
      console.log(error);
      res.json({ err: true, message: error.message });
    }
  },

  googleAuth: async (req, res) => {
    console.log("auth controller");
    try {

      if (req.body.access_token) {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`);
        // Checking if the user exists

        console.log(response, 'jjjjjjjfffffff');
        const user = await userModel.findOne({ googleId: response.data.id, loginWithGoogle: true }, { password: 0 });
        if (user) {
          // Check if the user is banned or not
          if (!user.blocked) {
            const token = createToken(user._id);
            return res.cookie("userToken", token, {
              httpOnly: true,
              secure: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
              sameSite: "none",
            }).json({ created: true, user, token, message: "Login Success" });
          } else {
            return res.status(200).json({ user, message: "Sorry, you are banned!" });
          }
        } else {
          let bcrypPassword = await bcrypt.hash(response.data.id, 10);
          // If the user does not exist, create a new account
          const newUser = await userModel.create({
            googleId: response.data.id,
            firstName: response.data.given_name,
            lastName: response.data.family_name,
            email: response.data.email,
            image: response.data.picture,
            loginWithGoogle: true,
            password: bcrypPassword,
          });

          // Create a token after creating the new user
          const token = createToken(newUser._id);

          return res.cookie("userToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
          }).json({ created: true, user: newUser, token, message: "Signup Success" });
        }
      } else {
        return res.status(401).json({ message: "Not authorized" });
      }
    } catch (error) {
      console.log("fe");
      console.log(error);
      res.status(500).json({ created: false, message: "Internal server error" });
    }
  },
  userLogout: async (req, res) => {
    console.log("userlogout ");
    return res.cookie("userToken", '', {
      httpOnly: true,
      secure: true,
      maxAge: 0, // Set the maxAge to 0 to expire the cookie immediately
      sameSite: "none",
    }).json({ err: false, message: 'Logged out successfully' });
  },
  userPhoneNumber: async (req, res) => {
    try {
      const { phoneNumber, _id } = req.body;
      await userModel.findByIdAndUpdate(_id, { phoneNumber });
      res.status(200).json({ message: 'Phone number updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the phone number.' });
    }
  },
  getBookingById: async (req, res) => {
    try {
      console.log("ook");
      const { id } = req.query; // Use req.query.id to access query parameter
      console.log(id);
      const booking = await bookingModel.findById(id);
      console.log(booking);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.status(200).json({ booking, message: 'Booking details' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while getting booking details' });
    }
  },
  updateDetails: async (req, res) => {
    try {
      console.log("update sredde");

      const { userId } = req.params; // Assuming you're getting the user ID from the request parameters
      const { details } = req.body; // Assuming you're sending the updated details in the request body
      // Use Mongoose's updateOne or findOneAndUpdate to update the user details
      console.log(userId, details);
      const updatedUser = await userModel.updateOne(
        { _id: userId },
        { $set: details },
        { new: true }
      );

      if (updatedUser) {
        return res.status(200).json({ message: 'User details updated successfully' });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const { details } = req.body; // Assuming you're sending the image URL in the 'details' field
      console.log("dd");
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(details, {
        folder: 'profileImage'
      });

      // Update the user's image URL in the database
      const updatedUser = await userModel.updateOne(
        { _id: userId },
        {
          $set: {
            image: result.secure_url
          }
        }
      );
      console.log("d4d", updatedUser);
      return res.status(200).json({ message: 'User profile image updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const email = req.body.data; // Extract email from request body
  
      const result = await userModel.findOne({ email });
      if (!result) {
        return res.status(200).json({ success: false, message: "Email not found" });
      }
      if (result.blocked) {
        return res.status(200).json({ success: false, message: "Sorry you are blocked" });
      }
      
      // Generate a 4-digit numeric OTP as a string
      const numericOtp = otpGenerator.generate(4, { digits: true, alphabets: false, specialChars: false });
      console.log(numericOtp, "Generated OTP");
      storedOtp=numericOtp;
      // Convert the OTP from a string to a number
      const numericOtpNumber = parseInt(numericOtp, 10);
  
      // Send the numeric OTP to the user's email
      await sentOTP(email, numericOtpNumber); // You would replace this with your actual function
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  
  verifyOTP:async(req,res)=>{
    try {
      const receivedOtp = req.body.data;
      if (receivedOtp === storedOtp) {
        console.log("rffr");
        storedOtp=null;
        res.status(200).json({ success: true, message: 'OTP verified successfully' });
      } else {
        console.log("rffefr");
        res.status(400).json({ success: false, message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  postUpdatePassword: async (req, res) => {
    try {
      const { email, password } = req.body.data;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const response = await userModel.findOneAndUpdate(
        { email },
        { password: hashedPassword }
      );
  
      if (response) {
        return res.status(200).json({
          success: true,
          message: 'Password updated successfully.'
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'User not found or password not updated.'
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while updating the password.'
      });
    }
  }
  
};    
