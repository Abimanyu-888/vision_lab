
import { useState } from 'react'
import { useImage } from '../../../../../image_context'
import Slider from '../Slider/Slider'
function Filters(props){
    const { uploadedImg, setUploadImg } = useImage();

    const handleMeanBlur=async(e)=>{
        const k=e.target.value
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
            console.log(parseInt(k))

            const inputName = "input.jpg";
            const outputName = "output.jpg";

            props.module.FS.writeFile(inputName,uint8View)

            props.module.MeanBlur(inputName,outputName,parseInt(k))

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
    const handleContrast=async(e)=>{
        const k=e.target.value
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
            console.log(parseInt(k))

            const inputName = "input.jpg";
            const outputName = "output.jpg";

            props.module.FS.writeFile(inputName,uint8View)

            props.module.Contrast(inputName,outputName,parseInt(k))

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
    const handleExposure=async(e)=>{
        const k=e.target.value
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
            console.log(parseInt(k))

            const inputName = "input.jpg";
            const outputName = "output.jpg";

            props.module.FS.writeFile(inputName,uint8View)

            props.module.Exposure(inputName,outputName,parseInt(k))

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
    const handleSaturation=async(e)=>{
        const k=e.target.value
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
            console.log(parseInt(k))

            const inputName = "input.jpg";
            const outputName = "output.jpg";

            props.module.FS.writeFile(inputName,uint8View)

            props.module.Saturation(inputName,outputName,parseInt(k))

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
    const handleGaussianBlur=async(e)=>{
        const k=e.target.value
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
            console.log(parseInt(k))

            const inputName = "input.jpg";
            const outputName = "output.jpg";

            props.module.FS.writeFile(inputName,uint8View)

            props.module.GaussianBlur(inputName,outputName,parseInt(k))

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
    return(
    <>
        <Slider label="Mean Blur" onCommit={handleMeanBlur} />
        <Slider label="Gaussian Blur" onCommit={handleGaussianBlur} />
        <Slider label="Exposure" onCommit={handleExposure} />
        <Slider label="contrast" onCommit={handleContrast} />
        <Slider label="Saturation" onCommit={handleSaturation} />
        <Slider label="Gamma Correction" onCommit={()=>{return 0}} />
        <Slider label="Histogram Equalization" onCommit={()=>{return 0}} />
        <Slider label="Canny Edge Detection" onCommit={()=>{return 0}} />
        <Slider label="Laplacian" onCommit={()=>{return 0}} />
        <Slider label="Sharpening (Unsharp Masking)" onCommit={()=>{return 0}} />
        <Slider label="Gaussian Noise" onCommit={()=>{return 0}} />
        <Slider label="Salt-and-Pepper" onCommit={()=>{return 0}} />
    </>
    )
}

export default Filters