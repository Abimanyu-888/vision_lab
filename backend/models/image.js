import mongoose from "mongoose";

const imageSchema=new mongoose.Schema({
    publicId: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    secureUrl: {
        type: String,
        required: true
    },
    format: {
        type: String
    },
    folder: {
        type: String
    },
    originalFilename: {
        type: String
    },
    uploadedBy: {
        type: String,
        required:true,
        ref: "User"
    }
},
{
    timeseries:true
}
)


export const Image=mongoose.model("Image",imageSchema)