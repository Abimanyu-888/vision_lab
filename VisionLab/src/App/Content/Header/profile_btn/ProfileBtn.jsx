import styles from './profilebtn.module.css'
function ProfileBtn(){
    return(
        <div className={styles.avatar_ring}>
            <div className={styles.avatar_inner}>
                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="User" className={styles.avatar_img} />
            </div>
        </div>
    )
}
export default ProfileBtn