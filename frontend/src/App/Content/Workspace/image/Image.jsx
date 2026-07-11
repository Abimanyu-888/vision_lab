import styles from './image.module.css'
import { useImage } from '../../../../image_context'
function Image(){
    const {uploadedImg}=useImage()
    return(
        <div className={styles.canvas_container}>
            <div className={styles.canvas_bg_overlay}></div>
            <div className={styles.canvas_vignette}></div>
            <div className={styles.image_wrapper} >
                <img id={styles.preview_image} src={uploadedImg} alt="Cyberpunk City" />
            </div>
        </div>
    )
}

export default Image