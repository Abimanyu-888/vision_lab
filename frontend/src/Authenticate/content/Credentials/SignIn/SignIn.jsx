// src/Authenticate/content/Credentials/SignIn/SignIn.jsx
import styles from './SignIn.module.css'
import { useState } from 'react'
import { useAuth } from '../../../../auth_context'
import { useNavigate } from 'react-router-dom'

function SignIn({ isActive }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    if (!isActive) return null

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            const userCredentials = await login(email, password)
            const idToken = await userCredentials.user.getIdToken()
            const response = await fetch("http://localhost:3000/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                }
            })
            if (!response.ok) {
                throw new Error("Backend authentication failed")
            }
            navigate('/')
        } 
        catch (err){
            setError('Failed to sign in: ' + err.message)
        }
    }

    return (
        <form id="signin-form" className={`${styles.space_y_5} ${styles.mode_enter}`} onSubmit={handleSubmit}>
            {error && <div style={{color: 'red', fontSize: '12px'}}>{error}</div>}
            
            <div className={styles.input_group}>
                <label className={styles.label}>Neural ID / Email</label>
                <div className={styles.input_wrapper}>
                    <i data-lucide="mail" className={styles.input_icon}></i>
                    <input 
                        className={styles.value} 
                        type="email" 
                        placeholder="user@vision.ai"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>
            
            <div className={styles.input_group}>
                <label className={`${styles.label} ${styles.label_row}`}>
                    <span>Passcode</span>
                    <a href="#" className={styles.forgot_link}>Forgot?</a>
                </label>
                <div className={styles.input_wrapper}>
                    <i data-lucide="lock" className={styles.input_icon}></i>
                    <input 
                        className={styles.value} 
                        type="password" 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>

            <button className={`${styles.submit_btn} ${styles.btn_primary}`}>
                <span>INITIALIZE SESSION</span>
                <i data-lucide="arrow-right" width="16" height="16"></i>
            </button>
        </form>
    )
}
export default SignIn