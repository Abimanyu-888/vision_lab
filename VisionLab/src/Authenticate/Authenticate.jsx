import styles from './Authenticate.module.css'
import Content from './content/content'
import { useAuth } from '../auth_context'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function SignIn(){
    const {currentUser}=useAuth();
    const navigate=useNavigate()
    useEffect(()=>{
        if(currentUser){
            navigate('/')
        }
    },[currentUser, navigate])
    if (currentUser) return null;
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