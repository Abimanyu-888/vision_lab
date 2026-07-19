import { useState ,useEffect} from 'react'
import styles from './Slider.module.css'

function Slider({
    label, 
    onCommit, 
    min = 0, 
    max = 100, 
    step = 1, 
    defaultValue = 50, 
    hasSlider = true 
}){
    
    const [value, setValue] = useState(defaultValue)
    const [isActive, setIsActive] = useState(false)

    const handleSlider = (e) => {
        setValue(e.target.value)
    }
    
    const toggleActive = () => {
        if (!hasSlider) {
            onCommit()
            return
        }
        setIsActive(!isActive)
    }

    return(
        <div className={styles.slider_group}>
            <div className={styles.header_row}>
                <span className={styles.label_text}>{label}</span>
                
                <div className={styles.controls_wrapper}>
                    {isActive && hasSlider && <span className={styles.slider_val}>{value}</span>}
                    <button 
                        className={styles.activation_btn} 
                        onClick={toggleActive}
                        title={isActive ? "Deactivate" : "Activate"}
                    >
                        <div className={`${styles.dot} ${isActive ? styles.active : ''}`}></div>
                    </button>
                </div>
            </div>
            
            {isActive && hasSlider && (
                <div className={styles.slider_container}>
                    <input 
                        type="range" 
                        min={min} 
                        max={max} 
                        step={step} 
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