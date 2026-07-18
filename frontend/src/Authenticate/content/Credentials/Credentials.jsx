import styles from './Credentials.module.css'
import SignIn from './SignIn/SignIn.jsx'
import SignUp from './SignUp/SignUp.jsx'
import google_logo from '/src/assets/google.svg'
import github_logo from '/src/assets/github.svg'
import { useState } from 'react'
import { useAuth } from '../../../auth_context.jsx'
import { useNavigate } from 'react-router-dom'
function Credentials(){
    const [isSignIn,setSignIn]=useState(true)
    const { googleSignIn } = useAuth()
    const navigate = useNavigate()

    async function handleGoogleSignIn() {
        try {
            const userCredentials=await googleSignIn()
            const idToken = await userCredentials.user.getIdToken();

            const response = await fetch("http://localhost:3000/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}` 
                }
            });
            if(!response.ok){
                throw new Error("Failed to save new user")
            }
            navigate('/')
        }catch (error) {
            console.error("Google Sign In Failed", error)
        }
    }
    return(
        <div className={styles.glass_panel}>
            <div className={styles.glass_glow_top}></div>

            <div className={styles.tab_container}>
                <div id="tab-bg" className={styles.tab_slider} style={{ 
                        transform: isSignIn ? 'translateX(0)' : 'translateX(100%)',
                        left: isSignIn ? '4px' : null // Adjust for gap like in prototype
                    }}>
                    
                </div>
                
                <button className={`${styles.tab_btn} ${isSignIn? styles.tab_active: styles.tab_inactive}`} onClick={()=>setSignIn(true)} >
                    SIGN IN
                </button>
                <button className={`${styles.tab_btn} ${isSignIn? styles.tab_inactive:styles.tab_active}`} onClick={()=>setSignIn(false)}>
                    REGISTER
                </button>
            </div>

            <div id="form-container" className={styles.form_container}>
                
                <SignIn isActive={isSignIn}/>

                <SignUp isActive={!isSignIn}/>

            </div>

            <div className={styles.divider}>
                <div className={styles.divider_line}>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.divider_text_wrapper}>
                    <span className={styles.divider_text}>Or continue with</span>
                </div>
            </div>

            <div className={styles.social_grid}>
                <button className={styles.social_btn}>
                    <img src={github_logo}/>
                    <span>GITHUB</span>
                </button>
                <button className={styles.social_btn} onClick={handleGoogleSignIn} type="button">
                    <img src={google_logo}/>
                    <span>GOOGLE</span>
                </button>
            </div>
        </div>
    )
}
export default Credentials