import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firebaseUID:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true,
        match:/^[A-Za-z ]+$/
    },
    email:{
        type:String,
        required:true,
        match:/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/
    }
},
{
    timeseries:true
}
)


export const User=mongoose.model("User",userSchema)