import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import chatRoutes from "./routes/chatRoutes.js"
import userRouter from "./routes/userRoutes/userAuthRouter.js";
import hostRouter from "./routes/hostRoutes/hostAuthRouter.js";
import adminRouter from "./routes/adminRoutes/adminRouter.js";
import dbConnect from "./config/dbConnect.js";
import { createServer } from "http"; // Import createServer from http
import { Server } from "socket.io"; // Import Server from socket.io
import socketConnect from "../server/config/socket.io.js"; // Import your socketConnect function

const app = express();
const server = createServer(app); // Use createServer instead of http.createServer

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"]
  },
});
let activeUsers={}
socketConnect(io, activeUsers)


app.use(express.urlencoded({ extended: true, limit:"50mb" }));
app.use(express.json({limit:"50mb"}))
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());

app.use('/', userRouter);
app.use('/host', hostRouter);
app.use('/admin',adminRouter)
app.use('/chat',chatRoutes)
dbConnect();

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
