import styles from './header.module.css'

import Login_btn from './login_btn/login_btn.jsx';
import ProfileBtn from './profile_btn/ProfileBtn.jsx';
function Header(){
    return(
        <div className={styles.app_header}>
            <div>
                <h1 className={styles.heading_styles}>
                    VISION<span className={styles.text_neon_blue}>Lab</span>
                </h1>
                <p className={styles.subtitle}>IMAGE PROCESSING UNIT</p>
            </div>

            <div className={styles.header_actions}>
                <Login_btn/>
                <ProfileBtn/>
            </div>
        </div>
    )
}

export default Header