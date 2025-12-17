import './controlPanel.css'

function ControlPanel(){
    return(
        <div className="control-panel glass_panel">
            
            <div className="panel-header">
                <h2 className="panel-title">PARAMETERS</h2>
                <div className="flex gap-2 items-center">
                        <div className="status-dot"></div>
                        {/* FIX 1: Changed style string to object */}
                        <span className="text-neon-mint font-mono" style={{ fontSize: '10px' }}>ONLINE</span>
                </div>
            </div>

            <div className="sliders-area">
                <div className="slider-group">
                    <div className="slider-label">
                        <span>EXPOSURE</span>
                        <span className="slider-val" id="val-exposure">100%</span>
                    </div>
                    <input type="range" min="0" max="200" defaultValue="100" /> {/* Note: Use defaultValue for uncontrolled inputs to avoid warnings */}
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
                <span id="btn-text">EXPORT RESULT</span>
                {/* Note: lucide-react icons usually render as components, not <i> tags, but this will technically render without crashing */}
                <i data-lucide="arrow-right" width="16" height="16" id="btn-icon"></i>
            </button>
        </div>
    )
}

export default ControlPanel