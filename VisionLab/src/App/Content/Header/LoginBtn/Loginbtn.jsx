import styles from './btn.module.css'
import logo from '/src/assets/log-in.svg'
import { useAuth } from '../../../../auth_context';
import { useNavigate } from 'react-router-dom';
function LoginBtn(){
    const { currentUser, logout } = useAuth(); // Get real state
    const navigate = useNavigate();
    async function handleAuthAction() {
        if (currentUser) {
            try {
                await logout();
                navigate('/login');
            } catch {
                console.error("Failed to log out");
            }
        } else {
            navigate('/login');
        }
    }
    return(
        <button onClick={handleAuthAction} className={styles.upload_btn}>
            <img src={logo}/>
            <span>LogIn</span>
        </button>
    )
}
export default LoginBtn