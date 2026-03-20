import { useState } from 'react'
import styles from './Slider.module.css'

function Slider({label, onCommit}){
    const [value, setValue] = useState(1)
    const [isActive, setIsActive] = useState(false)

    const handleSlider = (e) => {
        setValue(e.target.value)
    }
    
    const toggleActive = () => {
        setIsActive(!isActive)
    }

    return(
        <div className={styles.slider_group}>
            
            <div className={styles.header_row}>
                <span className={styles.label_text}>{label}</span>
                
                <div className={styles.controls_wrapper}>
                    {isActive && <span className={styles.slider_val}>{value}</span>}
                    <button 
                        className={styles.activation_btn} 
                        onClick={toggleActive}
                        title={isActive ? "Deactivate" : "Activate"}
                    >
                        <div className={`${styles.dot} ${isActive ? styles.active : ''}`}></div>
                    </button>
                </div>
            </div>
            {isActive && (
                <div className={styles.slider_container}>
                    <input 
                        type="range" 
                        min="1" 
                        max="51" 
                        step="2" 
                        value={value} 
                        onChange={handleSlider} 
                        onMouseUp={onCommit}
                    />
                </div>
            )}
        </div>
    )
}

export default Slider