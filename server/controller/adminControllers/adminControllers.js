import sentOTP from "../../helper/sentOTP.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import adminModel from "../../models/adminModel.js";
import userModel from "../../models/userModel.js";
import hostModel from "../../models/hostModel.js";
import propertyModel from "../../models/propertyModel.js";

export default {
  postLogIn: async (req, res) => {
    try {
      console.log("admin");
      const { email, password } = req.body;

      const admin = await adminModel.findOne({ email: email });
      if (admin) {
        if (password == admin.password) {
          const token = jwt
            .sign({ id: admin._id }, "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");

          return res.cookie("adminToken", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
          }).json({ err: false, message: 'admin login success' });
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
  },
  getLoggedInAdmin: async (req, res) => {
    try {
      const token = req.cookies.adminToken; // Corrected cookie name
      if (!token) {
        return res.json({ loggedIn: false, error: true, message: "no token" });
      }

      const verifiedJWT = jwt.verify(token, "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
      const admin = await adminModel.findById(verifiedJWT.id, { password: 0 });
      if (!admin) {
        return res.json({ loggedIn: false, error: true, message: "User not found" });
      }
      return res.json({ loggedIn: true, admin, token });
    } catch (err) {
      console.log(err);
      res.json({ loggedIn: false, error: true, message: err.message });
    }
  },
  getUsers: async (req, res) => {
    try {

      const users = await userModel.find().lean();

      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  },
  getHosts: async (req, res) => {
    try {

      const hosts = await hostModel.find().lean();

      res.json(hosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  },
  postBlockUser: async (req, res) => {
    try {
      console.log("block user");
      const { userId } = req.body;
      console.log(userId);
      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Block the user logic goes here
      user.blocked = true;
      await user.save();
      return res.json({ message: "User blocked successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  postUnBlockUser: async (req, res) => {
    try {
      const { userId } = req.body;
      console.log("Unblock user", userId);
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Unblock the user logic goes here
      user.blocked = false;
      await user.save();
      return res.json({ message: "User unblocked successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  postBlockHost: async (req, res) => {
    try {
      console.log("block host");
      const { hostId } = req.body;

      const host = await hostModel.findById(hostId);

      if (!host) {
        return res.status(404).json({ error: "Host not found" });
      }
      // Block the host logic goes here
      host.blocked = true;
      await host.save();
      return res.json({ message: "Host blocked successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  postUnBlockHost: async (req, res) => {
    try {
      const { hostId } = req.body;
      console.log("Unblock host", hostId);
      const host = await hostModel.findById(hostId);

      if (!host) {
        return res.status(404).json({ error: "Host not found" });
      }
      // Unblock the user logic goes here
      host.blocked = false;
      await host.save();
      return res.json({ message: "Host unblocked successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  adminLogout:async(req,res)=>{
    console.log("admin logout");
    return res.cookie("adminToken", '', {
      httpOnly: true,
      secure: true,
      maxAge: 0, // Set the maxAge to 0 to expire the cookie immediately
      sameSite: "none",
  }).json({ err: false, message: 'Logged out successfully' });
  },
  getProperties: async (req, res) => {
    try {
console.log("propr");
      const properties = await propertyModel.find().lean();

      res.json(properties);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  },
  postUpdateListingStatus: async (req, res) => {
    try {
      const { propertyId } = req.params;
      const status = req.body.status; // Access the status property directly
      console.log(propertyId);
      console.log(status.status);
  
      const property = await propertyModel.updateOne({ _id: propertyId }, { status: status.status });
      console.log(property);
      res.json({ message: 'Listing status updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update listing status' });
    }
  },
  
 
};
