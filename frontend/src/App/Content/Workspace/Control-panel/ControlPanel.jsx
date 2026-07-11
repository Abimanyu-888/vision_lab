import './controlPanel.css'
import { useState, useEffect } from 'react'

import arrow from '/src/assets/arrow-right.svg'
import Filters from './img_filters/filters'
import SpacialTransfo from './Spacial_Transfo/SpacialTransfo'
import RecognizeNum from './Recognize_num/RecognizeNum'
import { useFeature } from '../../../../feature_contest'
function ControlPanel(){
    const {currentFeature}=useFeature();
    
    const [wasmModule,setWasmModule]=useState(null)
    const [isprocessing,setIsProcessing]=useState(null)

    

    useEffect(()=>{
        const loadWasm=async () =>{
            try{
                if(!document.querySelector('script[src="/wasm/module.js"]')){
                    const script=document.createElement('script')
                    script.src='/wasm/module.js'
                    script.async=true
                    script.onerror = () => {
                        console.error("CRITICAL: Failed to load /wasm/module.js. Check if file exists in public/wasm folder.");
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
                {currentFeature===1?<RecognizeNum/>:currentFeature===2?<Filters setProcessing={setIsProcessing} module={wasmModule}/>:<SpacialTransfo/>}
                
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