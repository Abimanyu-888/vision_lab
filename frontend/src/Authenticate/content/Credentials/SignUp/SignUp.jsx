// src/Authenticate/content/Credentials/SignUp/SignUp.jsx
import styles from './SignUp.module.css'
import { useState } from 'react'
import { useAuth } from '../../../../auth_context'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'

function SignUp({ isActive }) {
    const [name,setName ] = useState('')
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
            const userCredentials=await signup(email, password)

            await updateProfile(userCredentials.user, { 
                displayName: name,
                photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLOxRW9wIvJfJHNtxsSBRGG7drOdLd5NwKKAbnii5FA&s=10"
            });
            await updateProfile(userCredentials.user, {photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqLOxRW9wIvJfJHNtxsSBRGG7drOdLd5NwKKAbnii5FA&s=10",});

            const idToken = await userCredentials.user.getIdToken(true);
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
                    <label className={styles.label}>Name</label>
                    <input 
                        className={`${styles.value} ${styles.padd}`} 
                        type="text" 
                        placeholder="Abimanyu" 
                        onChange={(e)=>setName(e.target.value)}
                        required/> 
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