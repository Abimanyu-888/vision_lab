import './controlPanel.css'
import { useState, useEffect } from 'react'
import { useImage } from '../../../../image_context'
import arrow from '/src/assets/arrow-right.svg'
function ControlPanel(){
    const { uploadedImg, setUploadImg } = useImage();
    const [wasmModule,setWasmModule]=useState(null)
    const [isprocessing,setIsProcessing]=useState(null)

    const [blurval,setBlurval]=useState(21)

    useEffect(()=>{
        const loadWasm=async () =>{
            try{
                if(!document.querySelector('script[src="/wasm/blur.js"]')){
                    const script=document.createElement('script')
                    script.src='/wasm/blur.js'
                    script.async=true
                    script.onerror = () => {
                        console.error("CRITICAL: Failed to load /wasm/blur.js. Check if file exists in public/wasm folder.");
                    };
                    script.onload = async ()=>{
                        if(window.createBlurModule){
                            const module=await window.createBlurModule({locateFile:(path)=> '/wasm/'+path});
                            setWasmModule(module)
                            console.log("Wasm module loaded")
                        }

                    }
                    document.body.appendChild(script)
                }
                else if(window.createBlurModule && !wasmModule){
                    const module=await window.createBlurModule({locateFile:(path)=> '/wasm/'+path});
                    setWasmModule(module)                            
                }
            }
            catch(e){
                console.error("failed to load wasm",e)
            }

        }
        loadWasm();
        
    },[])

    const handleProcess=async(k)=>{
        if(!wasmModule){
            alert("System is still booting up (WASM Loading)...");
            return 
        }
        setIsProcessing(true)
        try{
            const response=await fetch(uploadedImg);
            const blob=await response.blob();
            console.log("Debug Image Type:", blob.type)
            const arrayBuffer=await blob.arrayBuffer()
            const uint8View=new Uint8Array(arrayBuffer);

            const inputName = "input.jpg";
            const outputName = "output.jpg";

            wasmModule.FS.writeFile(inputName,uint8View)

            wasmModule.image_blur(inputName,outputName,parseInt(k))

            if (wasmModule.FS.analyzePath(outputName).exists) {
                const processedContent = wasmModule.FS.readFile(outputName)
                const resultBlob = new Blob([processedContent], { type: 'image/jpeg' })
                const resultUrl = URL.createObjectURL(resultBlob)
                setUploadImg(resultUrl);

                // Cleanup
                wasmModule.FS.unlink(outputName);
            } else {
                console.error("C++ failed to generate output image.");
                alert("Filter failed. The image format might not be supported.");
            }


        }
        catch (err) {
            console.error("Processing Error:", err);
            alert("Failed to process image.");
        } finally {
            setIsProcessing(false);
        }
    }

    const handleSlider=(e)=>{
        setBlurval(e.target.value)
    }
    const handleSliderCommit=()=>{
        handleProcess(blurval)
    }
    return(
        <div className="control-panel glass_panel">
            
            <div className="panel-header">
                <h2 className="panel-title">PARAMETERS</h2>
                <div className="flex gap-2 items-center">
                        <div className="status-dot"></div>
                        <span className="text-neon-mint font-mono" style={{ fontSize: '10px' }}>{wasmModule ? "SYSTEM ONLINE" : "INITIALIZING..."}</span>
                </div>
            </div>

            <div className="sliders-area">
                <div className="slider-group">
                    <div className="slider-label">
                        <span>EXPOSURE</span>
                        <span className="slider-val" id="val-exposure">100%</span>
                    </div>
                    <input type="range" min="0" max="200" defaultValue="100" />
                </div>

                <div className="slider-group">
                    <div className="slider-label">
                        <span>CONTRAST</span>
                        <span className="slider-val" id="val-contrast">100%</span>
                    </div>
                    <input type="range" min="0" max="200" defaultValue="100" />
                </div>

                <div className="slider-group">
                    <div className="slider-label">
                        <span>SATURATION</span>
                        <span className="slider-val" id="val-saturate">100%</span>
                    </div>
                    <input type="range" min="0" max="200" defaultValue="100" />
                </div>

                <div className="slider-group">
                    <div className="slider-label">
                        <span>HUE SHIFT</span>
                        <span className="slider-val" id="val-hue">0deg</span>
                    </div>
                    <input type="range" min="0" max="360" defaultValue="0" />
                </div>

                <div className="slider-group">
                    <div className="slider-label">
                        <span>blur</span>
                        <span className="slider-val" >{blurval}</span>
                    </div>
                    <input type="range" min="1" max="51" step="2" defaultValue={blurval} onChange={handleSlider} onMouseUp={handleSliderCommit}/>
                </div>
            </div>

            <div className="toggles-container">
                {/* FIX 2: Changed style string to object with camelCase keys */}
                <h3 className="font-mono" style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>NEURAL FILTERS</h3>
                
                <label className="toggle-row">
                    <span>Denoise (4x)</span>
                    <div className="switch">
                        <input type="checkbox"/>
                        <span className="slider-toggle"></span>
                    </div>
                </label>

                <label className="toggle-row">
                    <span>Edge Detection</span>
                    <div className="switch purple">
                        <input type="checkbox" id="edge-toggle" />
                        <span className="slider-toggle"></span>
                    </div>
                </label>
            </div>

            <button className="export-btn" >
                <span id="btn-text">{isprocessing ? "PROCESSING..." : "EXPORT RESULT"}</span>
                <img src={arrow}/>
            </button>
        </div>
    )
}

export default ControlPanel