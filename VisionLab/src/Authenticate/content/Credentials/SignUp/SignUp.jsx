// src/Authenticate/content/Credentials/SignUp/SignUp.jsx
import styles from './SignUp.module.css'
import { useState } from 'react'
import { useAuth } from '../../../../auth_context'
import { useNavigate } from 'react-router-dom'

function SignUp({ isActive }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { signup } = useAuth()
    const navigate = useNavigate()

    if (!isActive) return null

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            await signup(email, password)
            navigate('/') // Redirect to dashboard after signup
        } catch (err) {
            setError('Failed to create an account: ' + err.message)
        }
    }

    return (
        <form id="signup-form" className={`${styles.space_y_5} ${styles.mode_enter}`} onSubmit={handleSubmit}>
            {error && <div style={{color: 'red', fontSize: '12px'}}>{error}</div>}
            
            {/* ... First Name / Last Name inputs (You can store these in Firestore later) ... */}
             <div className={styles.input_row}>
                <div className={styles.input_group}>
                    <label className={styles.label}>First Name</label>
                    <input className={`${styles.value} ${styles.padd}`} type="text" placeholder="Ada" /> 
                </div>
                <div className={styles.input_group}>
                    <label className={styles.label}>Last Name</label>
                    <input className={`${styles.value} ${styles.padd}`} type="text" placeholder="Lovelace" />
                </div>
            </div>

            <div className={styles.input_group}>
                <label className={styles.label}>Work Email</label>
                <div className={styles.input_wrapper}>
                    <i data-lucide="mail" className={styles.input_icon}></i>
                    <input 
                        className={styles.value} 
                        type="email" 
                        placeholder="dev@vision.ai"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>
            
            <div className={styles.input_group}>
                <label className={styles.label}>Create Passcode</label>
                <div className={styles.input_wrapper}>
                    <i data-lucide="shield-check" className={styles.input_icon}></i>
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

            <button disabled={!email || !password} className={`${styles.submit_btn} ${styles.btn_secondary}`}>
                <span>CREATE ACCOUNT</span>
                <i data-lucide="user-plus" width="16" height="16"></i>
            </button>
        </form>
    )
}
export default SignUp