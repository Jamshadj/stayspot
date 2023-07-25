import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import userRouter from "./routes/userRoutes/userAuthRouter.js";
import hostRouter from "./routes/hostRoutes/hostAuthRouter.js";
import adminRouter from "./routes/adminRoutes/adminRouter.js";
import dbConnect from "./config/dbConnect.js";
const app = express();

app.use(express.urlencoded({ extended: true, limit:"50mb" }));
app.use(express.json({limit:"50mb"}))
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());

app.use('/', userRouter);
app.use('/host', hostRouter);
app.use('/admin',adminRouter)

dbConnect();

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
