import styles from './SignUp.module.css'
function SignUp({isActive}){
    if(!isActive) return null
    return(
        <form id="signup-form" className={`${styles.space_y_5} ${styles.mode_enter}`} >
            <div className={styles.input_row}>
                <div className={styles.input_group}>
                    <label className={styles.label}>First Name</label>
                    <input className={`${styles.value} ${styles.padd}`} type="text" placeholder="Ada" /> </div>
                <div className={styles.input_group}>
                    <label className={styles.label}>Last Name</label>
                    <input className={`${styles.value} ${styles.padd}`} type="text" placeholder="Lovelace" />
                </div>
            </div>

            <div className={styles.input_group}>
                <label className={styles.label}>Work Email</label>
                <div className={styles.input_wrapper}>
                    <i data-lucide="mail" className={styles.input_icon}></i>
                    <input className={styles.value} type="email" placeholder="dev@vision.ai"/>
                </div>
            </div>
            
            <div className={styles.input_group}>
                <label className={styles.label}>Create Passcode</label>
                <div className={styles.input_wrapper}>
                    <i data-lucide="shield-check" className={styles.input_icon}></i>
                    <input className={styles.value} type="password" placeholder="••••••••"/>
                </div>
            </div>

            <button className={`${styles.submit_btn} ${styles.btn_secondary}`}>
                <span>CREATE ACCOUNT</span>
                <i data-lucide="user-plus" width="16" height="16"></i>
            </button>
        </form>
    )
}
export default SignUp