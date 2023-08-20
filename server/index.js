import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import chatRouter from "./routes/chatRouter.js";
import hostChatRouter from "./routes/hostChatRouter.js";
import messageRouter from "./routes/messageRouter.js";
import userRouter from "./routes/userRoutes/userAuthRouter.js";
import hostRouter from "./routes/hostRoutes/hostAuthRouter.js";
import adminRouter from "./routes/adminRoutes/adminRouter.js";
import dbConnect from "./config/dbConnect.js";
import { createServer } from "http";
import { Server } from "socket.io";
import socketConnect from "./config/socket.io.js"; // Make sure to provide the correct path

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

let activeUsers = {}; // Active users object

// Pass the activeUsers object to the socketConnect function
socketConnect(io, activeUsers);

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());

app.use("/", userRouter);
app.use("/host", hostRouter);
app.use("/admin", adminRouter);
app.use("/chat", chatRouter);
app.use("/host/chat", hostChatRouter);
app.use("/message", messageRouter);
app.use("/host/message/", messageRouter);

dbConnect();

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
