import './controlPanel.css'
import { useState, useEffect } from 'react'
import arrow from '/src/assets/arrow-right.svg'
import Filters from './img_filters/filters'
import SpacialTransfo from './Spacial_Transfo/SpacialTransfo'
import RecognizeNum from './Recognize_num/RecognizeNum'
import { useFeature } from '../../../../feature_contest'
import { useImage } from '../../../../image_context'
import SavePopup from './save_pop_up/save'


function ControlPanel() {
    const { currentFeature } = useFeature();
    const { undo, redo, canUndo, canRedo,uploadedImg } = useImage();
    const [wasmModule, setWasmModule] = useState(null);
    const [isprocessing, setIsProcessing] = useState(null);
    const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);

    const {reloadKey}=useImage()

    useEffect(() => {
        const loadWasm = async () => {
            try {
                if (!document.querySelector('script[src="/wasm/module.js"]')) {
                    const script = document.createElement('script');
                    script.src = '/wasm/module.js';
                    script.async = true;
                    script.onerror = () => {
                        console.error("CRITICAL: Failed to load /wasm/module.js. Check if file exists in public/wasm folder.");
                    };
                    script.onload = async () => {
                        if (window.createModule) {
                            const module = await window.createModule({ locateFile: (path) => '/wasm/' + path });
                            setWasmModule(module);
                            console.log("Wasm module loaded");
                        }
                    };
                    document.body.appendChild(script);
                } else if (window.createModule && !wasmModule) {
                    const module = await window.createModule({ locateFile: (path) => '/wasm/' + path });
                    setWasmModule(module);
                }
            } catch (e) {
                console.error("failed to load wasm", e);
            }
        };
        loadWasm();
    }, []);

    const downloadImage=async()=> {
        const a = document.createElement("a");
        a.href = uploadedImg;
        a.download = "image.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <div className="control-panel glass_panel">
            <div className="panel-header">
                <h2 className="panel-title">PARAMETERS</h2>
                <div className="flex gap-2 items-center">
                    <div className="status-dot"></div>
                    <span className="text-neon-mint font-mono" style={{ fontSize: '10px' }}>
                        {wasmModule ? "SYSTEM ONLINE" : "INITIALIZING..."}
                    </span>
                </div>
            </div>

            <div className="sliders-area">
                {currentFeature === 2 ? <Filters setProcessing={setIsProcessing} module={wasmModule} key={reloadKey}/> : <SpacialTransfo setProcessing={setIsProcessing} module={wasmModule} key={reloadKey}/>}
            </div>

            {/* Replaced old toggles-container with Undo / Redo buttons */}
            <div className="history-controls">
                <button 
                    className="history-btn undo" 
                    onClick={undo} 
                    disabled={!canUndo}
                    title="Undo last action"
                >
                    <span>↩ Undo</span>
                </button>
                <button 
                    className="history-btn redo" 
                    onClick={redo} 
                    disabled={!canRedo}
                    title="Redo last action"
                >
                    <span>Redo ↪</span>
                </button>
            </div>
            <button className="export-btn"onClick={() => setIsSavePopupOpen(true)}>
                <span id="btn-text">{isprocessing ? "PROCESSING..." : "SAVE"}</span>
                <img src={arrow} alt="export" />
            </button>
            <button className="export-btn" onClick={downloadImage}>
                <span id="btn-text">{isprocessing ? "PROCESSING..." : "DOWNLOAD"}</span>
                <img src={arrow} alt="export" />
            </button>
            <SavePopup 
                isOpen={isSavePopupOpen} 
                onClose={() => setIsSavePopupOpen(false)} 
            />
        </div>
    );
}

export default ControlPanel;