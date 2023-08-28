import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect("mongodb://mongo_db:27017/stayspot"); // Use the service name as the hostname
    console.log("db connected");
  } catch (error) {
    console.error("db connection error:", error);
  }
}
