import mongoose from "mongoose";

export default function dbConnect(){
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://localhost:27017/stayspot").then(()=>{
        console.log("db connected")
    }).catch(err=>{ 
        console.log(err)
    })
}
