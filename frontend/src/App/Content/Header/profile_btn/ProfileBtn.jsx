import styles from './profilebtn.module.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../auth_context';

function ProfileBtn(){
    const { currentUser }=useAuth();
    const navigate =useNavigate()
    const handleClick=()=>{
        navigate('/profile')
    }
    return(
        <div className={styles.avatar_ring}>
            <div className={styles.avatar_inner}>
                <img src={currentUser.photoURL} className={styles.avatar_img} onClick={handleClick}/>
            </div>
        </div>
    )
}
export default ProfileBtn