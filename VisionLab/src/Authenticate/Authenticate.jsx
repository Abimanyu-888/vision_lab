import styles from './Authenticate.module.css'
import Content from './content/content'
function SignIn(){
    return(
        <div className={styles.sign_body}>
            <div className={styles.bg_mesh}></div>
            <div className={`${styles.orb} ${styles.orb_purple}`}></div>
            <div className={`${styles.orb} ${styles.orb_blue}`}></div>

            <Content/>
        </div>
    )
}
export default SignIn