// Import necessary modules
import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dbConnect from './config/dbConnect.js'; 
import socketConnect from './config/socket.io.js'; 
import path from "path"
// Import routers
import chatRouter from './routes/chatRouter.js';
import hostChatRouter from './routes/hostChatRouter.js';
import messageRouter from './routes/messageRouter.js';
import userRouter from './routes/userRouter.js';
import hostRouter from './routes/hostRouter.js';
import adminRouter from './routes/adminRouter.js';


// Create an Express app
const app = express();
const server = createServer(app);

// Initialize Socket.IO with CORS options
const io = new Server(server, {
  cors: {
    origin: [process.env.ORIGIN], 
    credentials: true,
  },
});

// Store active users in an object
let activeUsers = {};

// Pass the activeUsers object to the socketConnect function
socketConnect(io, activeUsers);
 
// Middleware

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
const _dirname = path.dirname("")
const buildPath = path.join(_dirname,"../client/build")
app.use(express.static(buildPath))
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));


// app.use(cors({ origin:['http://localhost:3000'], credentials: true }));

app.use(cookieParser());

// Route handling
app.use('/api', userRouter);
app.use('/api/host', hostRouter);
app.use('/api/admin', adminRouter);
app.use('/api/chat', chatRouter);
app.use('/api/host/chat', hostChatRouter);
app.use('/api/message', messageRouter);
app.use('/api/host/message', messageRouter);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });

// Connect to the database
dbConnect();

// Start the server
server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
