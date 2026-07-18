import { useRef } from 'react';
import { useImage } from '../../../image_context';


export function useApplyFilter(module, setProcessing) {
    const { uploadedImg, setUploadImg, undo } = useImage();
    const currentObjectUrl = useRef(null);

    const applyFilter = async (filterName, ...args) => {
        if (!module) {
            alert("System is still booting up (WASM Loading)...");
            return;
        }
        if (!uploadedImg) {
            alert("Please upload an image first.");
            return;
        }
        
        setProcessing(true);
        const inputName = "input.jpg";
        const outputName = "output.jpg";
        
        try {
            const response = await fetch(uploadedImg);
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();
            const uint8View = new Uint8Array(arrayBuffer);
            
            module.FS.writeFile(inputName, uint8View);
            
            if (typeof module[filterName] !== 'function') {
                throw new Error(`Filter function "${filterName}" is not bound in WASM module.`);
            }
            
            module[filterName](inputName, outputName, ...args);
            
            if (module.FS.analyzePath(outputName).exists) {
                const processedContent = module.FS.readFile(outputName);
                const resultBlob = new Blob([processedContent], { type: 'image/jpeg' });
                const resultUrl = URL.createObjectURL(resultBlob);
                
                if (currentObjectUrl.current && currentObjectUrl.current !== uploadedImg) {
                    URL.revokeObjectURL(currentObjectUrl.current);
                }
                currentObjectUrl.current = resultUrl;
                setUploadImg(resultUrl);
                module.FS.unlink(outputName);
            } else {
                console.error("C++ failed to generate output image.");
                alert("Filter failed. The image format might not be supported.");
            }
        } catch (err) {
            console.error(`Processing Error (${filterName}):`, err);
            alert("Failed to process image.");
        } finally {
            if (module.FS.analyzePath(inputName).exists) {
                module.FS.unlink(inputName);
            }
            setProcessing(false);
        }
    };

    return applyFilter;
}

export default useApplyFilter;