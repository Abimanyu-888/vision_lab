
import { useState } from 'react'
import { useImage } from '../../../../../image_context'
import Slider from '../Slider/Slider'
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
    const handleSliderCommit=(e)=>{
        handleProcess(e.target.value)
    }
    return(
    <>
        <Slider label="Blur" onCommit={handleSliderCommit} />
        <Slider label="Binarization" onCommit={()=>{return 0}} />
        <Slider label="Gamma Correction" onCommit={()=>{return 0}} />
        <Slider label="Histogram Equalization" onCommit={()=>{return 0}} />
        <Slider label="Gaussian Blur" onCommit={()=>{return 0}} />
        <Slider label="Canny Edge Detection" onCommit={()=>{return 0}} />
        <Slider label="Laplacian" onCommit={()=>{return 0}} />
        <Slider label="Sharpening (Unsharp Masking)" onCommit={()=>{return 0}} />
        <Slider label="Gaussian Noise" onCommit={()=>{return 0}} />
        <Slider label="Salt-and-Pepper" onCommit={()=>{return 0}} />


    </>
    )
}

export default Filters