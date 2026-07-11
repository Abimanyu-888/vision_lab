import mongoose from "mongoose";
export async function connectDB() {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/VisionLab")
        .then(()=>console.log("Connected"))
    }
    catch(err){
        console.error(err)
    }
}