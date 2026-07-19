import styles from './btn.module.css'
import logo from '/src/assets/cloud-upload.svg'
import { useImage } from '../../../../image_context'
import { useRef } from 'react'

function UploadBtn(){
    const MAX_SIZE = 10 * 1024 * 1024;
    const {setUploadImg}=useImage()
    const {setReloadKey,reloadKey}=useImage()
    const fileInputRef=useRef(null)
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.size > MAX_SIZE) {
            alert("File size must be less than 10 MB.");
            e.target.value = ""; 
            return;
        }
        setUploadImg(URL.createObjectURL(file));
        setReloadKey(reloadKey=>!reloadKey)

    };
    return(
        <>
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{display:'none'}} 
                onChange={handleFileChange} 
                accept="image/*"
            />
            <button className={styles.upload_btn} onClick={() => fileInputRef.current.click()}>
                <img src={logo}/>
                <span>Upload Source</span>
            </button>
        </>
    )
}
export default UploadBtn