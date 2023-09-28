import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect("mongodb://127.0.0.1:27017/stayspot"); 
    console.log("db connected");
  } catch (error) {
    console.error("db connection error:", error);
  }
}
