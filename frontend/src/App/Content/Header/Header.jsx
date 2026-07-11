// src/App/Content/Header/Header.jsx
import styles from './header.module.css'
import LoginBtn from './LoginBtn/Loginbtn.jsx';
import ProfileBtn from './profile_btn/ProfileBtn.jsx';
import { useAuth } from '../../../auth_context.jsx';
import UploadBtn from './UploadBtn/Uploadbtn.jsx';

function Header() {
    const { currentUser } = useAuth(); // Get real state

    return (
        <div className={styles.app_header}>
            <div>
                <h1 className={styles.heading_styles}>
                    VISION<span className={styles.text_neon_blue}>Lab</span>
                </h1>
                <p className={styles.subtitle}>IMAGE PROCESSING UNIT</p>
            </div>

            <div className={styles.header_actions}>
                <UploadBtn />
                {currentUser ? <ProfileBtn/> : <LoginBtn/>}
            </div>
        </div>
    )
}

export default Header