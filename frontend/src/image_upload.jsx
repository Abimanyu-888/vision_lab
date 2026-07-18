import { useAuth } from "./auth_context";



export async function sendImageUpload(fileInput) {
    const { currentUser }=useAuth();
    const formData = new FormData();
    
    // Key 'image' MUST match the name passed into multer: upload.single('image')
    formData.append("image", fileInput.files[0]);

    try {
        const response = await fetch(`http://localhost:3000/api/image/${currentUser.uid}`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Upload failed");
        }

        const data = await response.json();
        console.log("Success:", data);
        return data;

    } catch (error) {
        console.error("Frontend Upload Error:", error);
        throw error;
    }
}