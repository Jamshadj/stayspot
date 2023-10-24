import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import adminModel from "../models/AdminModel.js";
import userModel from "../models/UserModel.js";
import hostModel from "../models/HostModel.js";
import propertyModel from "../models/PropertyModel.js";
import bookingModel from "../models/BookingModel.js";
import WithdrawModel from "../models/WithdrawModel.js";

export default {
    // Admin login
    postLogIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const admin = await adminModel.findOne({ email });
            if (!admin) {
                return res.json({ err: true, message: 'Emailss does not exist' });
            }

            if (bcrypt.compareSync(password, admin.password)) {
                return res.json({ err: true, message: 'Incorrect password' });
            }

            const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECRET_KEY);

            res.json({ err: false, token, message: 'Admin login success' });
        } catch (error) {
            console.log(error);
            res.json({ err: true, message: error.message });
        }
    },

    // Get admin status
    getLoggedInAdmin: async (req, res) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ loggedIn: false, error: true, message: "No token" });
            }

            // Split the token to remove the "Bearer " prefix
            const tokenParts = token.split(' ');
            if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
                return res.status(401).json({ loggedIn: false, error: true, message: "Invalid token format" });
            }

            const jwtToken = tokenParts[1];

            // Verify the user's token and retrieve user details
            const verifiedJWT = jwt.verify(jwtToken, process.env.TOKEN_SECRET_KEY);
            // Respond with user details and token
            return res.status(200).json({ loggedIn: true, token: jwtToken })
        } catch (err) {
            res.json({ loggedIn: false, error: true, message: err.message });
        }
    },

    // Get users
    getUsers: async (req, res) => {
        try {
            const users = await userModel.find().lean();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get user by ID
    getUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await userModel.findById(userId); // Find user by ID
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Block user
    postBlockUser: async (req, res) => {
        try {
            const { userId } = req.body;
            const user = await userModel.findById(userId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            user.blocked = true; // Set user as blocked
            await user.save(); // Save updated user data
            res.json({ message: "User blocked" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    },

    // Unblock user
    postUnBlockUser: async (req, res) => {
        try {
            const { userId } = req.body;
            const user = await userModel.findById(userId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            user.blocked = false; // Set user as unblocked
            await user.save(); // Save updated user data
            res.json({ message: "User unblocked" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    },

    // Get hosts
    getHosts: async (req, res) => {
        try {
            const hosts = await hostModel.find().lean();
            res.json(hosts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Block a host
    postBlockHost: async (req, res) => {
        try {
            const { hostId } = req.body;

            const host = await hostModel.findById(hostId);

            if (!host) {
                return res.status(404).json({ error: "Host not found" });
            }

            host.blocked = true; // Set host as blocked
            await host.save(); // Save updated host data
            return res.json({ message: "Host blocked successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Unblock a host
    postUnBlockHost: async (req, res) => {
        try {
            const { hostId } = req.body;
            const host = await hostModel.findById(hostId);

            if (!host) {
                return res.status(404).json({ error: "Host not found" });
            }

            host.blocked = false; // Set host as unblocked
            await host.save(); // Save updated host data
            return res.json({ message: "Host unblocked successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Get withdrawal requests
    getWithdraw: async (req, res) => {
        try {
            const withdraw = await WithdrawModel.find().lean();
            res.json(withdraw);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Update withdrawal status and adjust host's wallet balance
    updateWithdrawStatus: async (req, res) => {
        try {
            const { _id, hostId, amount } = req.body.data; // Destructure the properties

            // Update withdrawal status
            const response = await WithdrawModel.findByIdAndUpdate(_id, {
                status: true
            });

            // Update host's wallet balance
            await hostModel.findByIdAndUpdate(hostId, { $inc: { wallet: -amount } });

            res.json(response); // Respond with updated status
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get all bookings
    getBookings: async (req, res) => {
        try {
            const bookings = await bookingModel.find().lean();
            res.json(bookings);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get a specific booking by ID
    getBookingById: async (req, res) => {
        try {
            const { bookingId } = req.params; // Get bookingId from URL
            const booking = await bookingModel.findById(bookingId);
            res.json(booking);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // Get properties
    getProperties: async (req, res) => {
        try {
            const properties = await propertyModel.find().lean();
            res.json(properties);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error });
        }
    },

    // Update listing status
    postUpdateListingStatus: async (req, res) => {
        try {
            const { propertyId } = req.params;
            const { status } = req.body; // Get the status string from the request body

            const property = await propertyModel.updateOne({ _id: propertyId }, { status: status.status });
            res.json({ message: 'Listing status updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update listing status' });
        }
    },

    // Add a new host
    postAddHost: async (req, res) => {
        try {
            const { firstName, lastName, email, phoneNumber, password } = req.body;

            // Create a new host using the hostModel
            const newHost = new hostModel({
                firstName,
                lastName,
                email,
                phoneNumber,
                password
            });

            // Save the new host to the database
            const savedHost = await newHost.save();

            res.status(201).json({
                message: 'Host created successfully',
                host: savedHost
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'An error occurred while creating the host'
            });
        }
    }
};