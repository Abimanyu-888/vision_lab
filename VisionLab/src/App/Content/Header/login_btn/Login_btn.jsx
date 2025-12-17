import {UploadCloud} from 'lucide-react';
import './login_btn.css'
function Login_btn(){
    return(
        <button className="upload-btn">
            <UploadCloud size={16} className="text-neon-blue" />
            <span>Upload Source</span>
        </button>
    )
}
export default Login_btn