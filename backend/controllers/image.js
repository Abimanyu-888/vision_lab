import { Image } from '../models/image.js'
import cloudinary from '../config/cloudinary.js';
export async function uploadImage(req,res) {
    try{
        const { userid } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                        folder: "visionlab_uploads",
                        resource_type: "image"
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(fileBuffer);
            });
        };
        const cloudResponse = await streamUpload(req.file.buffer);
        const newImage = await Image.create({
            publicId: cloudResponse.public_id,
            url: cloudResponse.url,
            secureUrl: cloudResponse.secure_url,
            format: cloudResponse.format,
            folder: cloudResponse.folder || "visionlab_uploads",
            originalFilename: req.file.originalname,
            uploadedBy: userid
        });
        return res.status(201).json({
            message: "Image uploaded and saved successfully",
            image: newImage
        });
    }
    catch(error){
        console.error("Upload Error:", error);
        return res.status(500).json({
            message: "Failed to upload image",
            error: error.message
        });
    }
}


export async function getImage(req,res) {
    try {
        const { uid } = req.params;
        const images = await Image.find({ uid: uid }).select('url originalFilename publicId -_id');
        if (!images || images.length === 0) {
            return res.status(200).json([]); // Return empty array if no images found
        }
        return res.status(200).json(images);
    }
    catch(error){
        console.error("Database error while fetching images:", error);
        return res.status(500).json({ error: "Internal server error while fetching images." });
    }
    
}

export async function deleteImage(req,res) {
    try{
        const { publicId }=req.body;
        await cloudinary.uploader.destroy(publicId);
        await Image.deleteOne({publicId:publicId});
        return res.status(200).json({
            message: "Image deleted successfully"
        });
    }
    catch(error){
        console.error("Failed to delete user images", error);
        return res.status(500).json({ error: "Failed to delete user images." });
    }
}

export async function deleteAllImages(req,res) {
    try{    
        const { uid }=req.params;
        const images=await Image.find({ uploadedBy:uid }).select('publicId');
        if (images.length === 0) {
            return res.status(404).json({ message: "No images found" });
        }
        await Promise.all(
            images.map(image => cloudinary.uploader.destroy(image.publicId))
        );
        await Image.deleteMany({ uploadedBy:uid });
        return res.status(200).json({
            message: "All images deleted successfully"
        });
    }
    catch(error){
        console.error("Failed to delete user images", error);
        return res.status(500).json({ error: "Failed to delete user images." });
    }
}