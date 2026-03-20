import styles from './profilebtn.module.css'
import { useNavigate } from 'react-router-dom'
function ProfileBtn(){
    const navigate =useNavigate()
    const handleClick=()=>{
        navigate('/profile')
    }
    return(
        <div className={styles.avatar_ring}>
            <div className={styles.avatar_inner}>
                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="User" className={styles.avatar_img} onClick={handleClick}/>
            </div>
        </div>
    )
}
export default ProfileBtn