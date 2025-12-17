import {UploadCloud} from 'lucide-react';
import styles from './login_btn.module.css'
function Login_btn(){
    return(
        <button className={styles.upload_btn}>
            <UploadCloud size={16} className={styles.text_neon_blue} />
            <span>Upload Source</span>
        </button>
    )
}
export default Login_btn