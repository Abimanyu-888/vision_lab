import styles from './btn.module.css'
import logo from '/src/assets/cloud-upload.svg'
function UploadBtn(){
    return(
        <button className={styles.upload_btn}>
            <img src={logo}/>
            <span>Upload Source</span>
        </button>
    )
}
export default UploadBtn