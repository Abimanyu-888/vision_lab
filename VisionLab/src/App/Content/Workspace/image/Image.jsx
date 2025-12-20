import styles from './image.module.css'
import { useImage } from '../../../../image_context'
function Image(){
    const {uploadImg}=useImage()
    const defaultImg = "/src/assets/download.jpeg";
    return(
        <div className={styles.canvas_container}>
            <div className={styles.canvas_bg_overlay}></div>
            <div className={styles.canvas_vignette}></div>
            <div className={styles.image_wrapper} >
                <img id={styles.preview_image} src={uploadImg || defaultImg} alt="Cyberpunk City" />
            </div>
        </div>
    )
}

export default Image