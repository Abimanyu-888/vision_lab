import styles from './SpacialTransfo.module.css'
function SpacialTransfo(){
    return(
    <>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Perspective X</span>
                <span className={styles.slider_val} >-1</span>
            </div>
            <input type="range" min="1" max="51" step="2" />
        </div>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Perspective Y</span>
                <span className={styles.slider_val} >-1</span>
            </div>
            <input type="range" min="1" max="51" step="2" />
        </div>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Scale</span>
                <span className={styles.slider_val} >-1</span>
            </div>
            <input type="range" min="1" max="51" step="2" />
        </div>

    </>
    )
}

export default SpacialTransfo