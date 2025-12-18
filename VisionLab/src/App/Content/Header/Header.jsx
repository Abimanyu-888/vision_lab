import styles from './header.module.css'

import Btn from './btn/btn.jsx';
import ProfileBtn from './profile_btn/ProfileBtn.jsx';
import UploadCloud from '/src/assets/cloud-upload.svg'
import logIn from '/src/assets/log-in.svg'
function Header(){
    const Logged=false
    return(
        <div className={styles.app_header}>
            <div>
                <h1 className={styles.heading_styles}>
                    VISION<span className={styles.text_neon_blue}>Lab</span>
                </h1>
                <p className={styles.subtitle}>IMAGE PROCESSING UNIT</p>
            </div>

            <div className={styles.header_actions}>
                <Btn logo={UploadCloud} info="Upload Source"/>
                {Logged? <ProfileBtn/> :<Btn logo={logIn} info="LogIn"/>}
                
            </div>
        </div>
    )
}

export default Header