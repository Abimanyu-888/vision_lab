import './image.css'
function Image(){
    return(
        <div className="canvas-container glass-panel" id="canvas-container">
            <div className="canvas-bg-overlay"></div>
            <div className="canvas-vignette"></div>
            <div className="image-wrapper" id="main-image-wrapper">
                <img id="preview-image" src="/src/assets/download.jpeg" alt="Cyberpunk City" />
                <div className="scan-overlay"><div className="scan-line"></div></div>
                <div className="bounding-box box-mint"><div className="box-label">0.98</div></div>
                <div className="bounding-box box-purple"><div className="box-label">NEON SIGN</div></div>
            </div>
        </div>
    )
}

export default Image