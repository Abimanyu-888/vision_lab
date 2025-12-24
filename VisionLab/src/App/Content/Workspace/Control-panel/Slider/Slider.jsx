import { useState } from 'react'
import styles from './Slider.module.css'

function Slider({label,onCommit}){
    const [value,setValue]=useState()
    const handleSlider=(e)=>{
        setValue(e.target.value)
    }
    return(
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>{label}</span>
                <span className={styles.slider_val} >{value}</span>
            </div>
            <input type="range" min="1" max="51" step="2" value={value} onChange={handleSlider} onMouseUp={onCommit}/>
        </div>
    )
}

export default Slider