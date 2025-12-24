import styles from './filters.module.css'
import { useState } from 'react'
import { useImage } from '../../../../../image_context'
function Filters(props){
    const [blurval,setBlurval]=useState(1)
    const [binary,setBinary]=useState(-1)
    const { uploadedImg, setUploadImg } = useImage();

    const handleProcess=async(k)=>{
        if(!props.module){
            alert("System is still booting up (WASM Loading)...");
            return 
        }
        props.setProcessing(true)
        try{
            const response=await fetch(uploadedImg);
            const blob=await response.blob();
            const arrayBuffer=await blob.arrayBuffer()
            const uint8View=new Uint8Array(arrayBuffer);

            const inputName = "input.jpg";
            const outputName = "output.jpg";

            props.module.FS.writeFile(inputName,uint8View)

            props.module.image_blur(inputName,outputName,parseInt(k))

            if (props.module.FS.analyzePath(outputName).exists) {
                const processedContent = props.module.FS.readFile(outputName)
                const resultBlob = new Blob([processedContent], { type: 'image/jpeg' })
                const resultUrl = URL.createObjectURL(resultBlob)
                setUploadImg(resultUrl);

                // Cleanup
                props.module.FS.unlink(outputName);
            } else {
                console.error("C++ failed to generate output image.");
                alert("Filter failed. The image format might not be supported.");
            }


        }
        catch (err) {
            console.error("Processing Error:", err);
            alert("Failed to process image.");
        } finally {
            props.setProcessing(false);
        }
    }

    const handleSlider=(e)=>{
        setBlurval(e.target.value)
    }
    const handleSliderCommit=()=>{
        handleProcess(blurval)
    }
    return(
    <>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Blur</span>
                <span className={styles.slider_val} >{blurval}</span>
            </div>
            <input type="range" min="1" max="51" step="2" defaultValue={blurval} onChange={handleSlider} onMouseUp={handleSliderCommit}/>
        </div>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Binarization</span>
                <span className={styles.slider_val} >{binary}</span>
            </div>
            <input type="range" min="1" max="51" step="2" defaultValue={blurval} onChange={handleSlider} onMouseUp={handleSliderCommit}/>
        </div>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Gamma Correction</span>
                <span className={styles.slider_val} >{binary}</span>
            </div>
            <input type="range" min="1" max="51" step="2" defaultValue={blurval} onChange={handleSlider} onMouseUp={handleSliderCommit}/>
        </div>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Histogram Equalization</span>
                <span className={styles.slider_val} >{binary}</span>
            </div>
            <input type="range" min="1" max="51" step="2" defaultValue={blurval} onChange={handleSlider} onMouseUp={handleSliderCommit}/>
        </div>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Gaussian Blur</span>
                <span className={styles.slider_val} >{binary}</span>
            </div>
            <input type="range" min="1" max="51" step="2" defaultValue={blurval} onChange={handleSlider} onMouseUp={handleSliderCommit}/>
        </div>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Canny Edge Detection</span>
                <span className={styles.slider_val} >{binary}</span>
            </div>
            <input type="range" min="1" max="51" step="2" defaultValue={blurval} onChange={handleSlider} onMouseUp={handleSliderCommit}/>
        </div>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Laplacian</span>
                <span className={styles.slider_val} >{binary}</span>
            </div>
            <input type="range" min="1" max="51" step="2" defaultValue={blurval} onChange={handleSlider} onMouseUp={handleSliderCommit}/>
        </div>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Sharpening (Unsharp Masking)</span>
                <span className={styles.slider_val} >{binary}</span>
            </div>
            <input type="range" min="1" max="51" step="2" defaultValue={blurval} onChange={handleSlider} onMouseUp={handleSliderCommit}/>
        </div>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Gaussian Noise</span>
                <span className={styles.slider_val} >{binary}</span>
            </div>
            <input type="range" min="1" max="51" step="2" defaultValue={blurval} onChange={handleSlider} onMouseUp={handleSliderCommit}/>
        </div>
        <div className={styles.slider_group}>
            <div className={styles.slider_label}>
                <span>Salt-and-Pepper</span>
                <span className={styles.slider_val} >{binary}</span>
            </div>
            <input type="range" min="1" max="51" step="2" defaultValue={blurval} onChange={handleSlider} onMouseUp={handleSliderCommit}/>
        </div>


    </>
    )
}

export default Filters