import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: './database.env' });
export async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        .then(()=>console.log("Connected"))
    }
    catch(err){
        console.error(err)
    }
}