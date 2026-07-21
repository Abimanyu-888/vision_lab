import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../auth_context';
import { useImage } from '../../../../../image_context';
import styles from './save.module.css';

function SavePopup({ isOpen, onClose }) {
    const [filename, setFilename] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    
    const { currentUser } = useAuth();
    const { uploadedImg } = useImage();
    const navigate = useNavigate();

    if (!isOpen) return null;

    if (!currentUser) {
        return (
            <div className={styles.overlay}>
                <div className={styles.modal_panel}>
                    <h3 className={styles.title}>LOGIN REQUIRED</h3>
                    <p className={styles.label} style={{ fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                        You must be logged in to save your assets to your cloud library.
                    </p>
                    <div className={styles.btn_group}>
                        <button type="button" className={styles.cancel_btn} onClick={onClose}>
                            CANCEL
                        </button>
                        <button 
                            type="button" 
                            className={styles.save_btn} 
                            onClick={() => {
                                onClose();
                                navigate('/login');
                            }}
                        >
                            GO TO LOGIN
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (!filename || !uploadedImg || !currentUser) return;

        setIsSaving(true);
        try {
            // Convert the object URL back to a Blob for backend transmission
            const response = await fetch(uploadedImg);
            const blob = await response.blob();

            const formData = new FormData();
            formData.append("image", blob, `${filename}.jpg`);
            formData.append("filename", filename);

            // Adjust this endpoint to match your Express backend routes
            const uploadResponse = await fetch(`https://vision-lab-r57w.onrender.com/api/image/${currentUser.uid}`, {
                method: "POST",
                body: formData
            });

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.message || "Failed to save image");
            }

            console.log("Image saved successfully");
            onClose();
        } catch (error) {
            console.error("Save Error:", error);
            alert("Failed to save. Check console for details.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal_panel}>
                <h3 className={styles.title}>SAVE ASSET</h3>
                <form onSubmit={handleSave} className={styles.form_layout}>
                    <div className={styles.input_group}>
                        <label className={styles.label}>FILENAME</label>
                        <input 
                            type="text" 
                            className={styles.glass_input} 
                            placeholder="project_omega_v1"
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                            autoFocus
                            required
                        />
                    </div>
                    <div className={styles.btn_group}>
                        <button type="button" className={styles.cancel_btn} onClick={onClose} disabled={isSaving}>
                            CANCEL
                        </button>
                        <button type="submit" className={styles.save_btn} disabled={isSaving || !filename}>
                            {isSaving ? "TRANSMITTING..." : "CONFIRM SAVE"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SavePopup;