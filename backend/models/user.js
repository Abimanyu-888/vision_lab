import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    uid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email_verified: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      default: "",
      trim: true,
    },
    picture: {
      type: String,
      default: "",
    }
},
{
    timeseries:true
}
)


export const User=mongoose.model("User",userSchema)