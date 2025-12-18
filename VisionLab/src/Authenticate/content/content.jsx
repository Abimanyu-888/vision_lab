import styles from './content.module.css'
import Credentials from './Credentials/Credentials'

function Content(){
    return(
        <div className={styles.auth_container}>
                
            <div className={styles.logo_area}>
                <div className={styles.logo_wrapper}>
                    <div className={`${styles.logo_ring} ${styles.ring_outer}`}></div>
                    <div className={`${styles.logo_ring} ${styles.ring_inner}`}></div>
                    <i data-lucide="aperture" width="32" height="32" className={styles.text_neon_blue}></i>
                </div>
                <h1 className={styles.brand_title}>VISION<span className={styles.text_neon_blue}>Lab</span></h1>
                <p className={styles.brand_subtitle}>IMAGE PROCESSING UNIT</p>
            </div>


            <Credentials/>
            

            <p className={styles.footer_text}>
                &copy; 2024 VISIONLab. ACCESS RESTRICTED.
            </p>

        </div>
    )
}
export default Content