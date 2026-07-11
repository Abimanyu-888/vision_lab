import styles from './btn.module.css'
import logo from '/src/assets/cloud-upload.svg'
import { useImage } from '../../../../image_context'
import { useRef } from 'react'
function UploadBtn(){
    const {setUploadImg}=useImage()
    const fileInputRef=useRef(null)
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setUploadImg(URL.createObjectURL(e.target.files[0]));
        }
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