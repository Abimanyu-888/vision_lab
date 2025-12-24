import styles from './Recognize_num.module.css'
function RecognizeNum(){
    return(
    <>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Confidence Threshold</span>
                <span className={styles.slider_val} >-1</span>
            </div>
            <input type="range" min="1" max="51" step="2" />
        </div>

    </>
    )
}

export default RecognizeNum