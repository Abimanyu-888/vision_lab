import styles from './image.module.css'
function Image(){
    return(
        <div className={styles.canvas_container}>
            <div className={styles.canvas_bg_overlay}></div>
            <div className={styles.canvas_vignette}></div>
            <div className={styles.image_wrapper} >
                <img id={styles.preview_image} src="/src/assets/download.jpeg" alt="Cyberpunk City" />
            </div>
        </div>
    )
}

export default Image