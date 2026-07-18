
import Slider from '../design/Slider.jsx';
import ActiveInactiveBtn from '../design/ActiveInactiveBtn.jsx';
import useApplyFilter from '../../applyFiler.jsx'; 
import { useImage } from '../../../../../image_context.jsx';

function Filters(props) {
    const { undo } = useImage();
    const applyFilter = useApplyFilter(props.module, props.setProcessing);
    return (
        <>
            {/* Spatial Blurs: Odd integers from 3 to 31 */}
            <Slider 
                 label="Mean Blur" 
                 min={3} max={31} step={2} defaultValue={3}
                onCommit={(e) => applyFilter("MeanBlur", parseInt(e.target.value, 10))}
            />
            <Slider 
                 label="Gaussian Blur" 
                 min={3} max={31} step={2} defaultValue={3}
                onCommit={(e) => applyFilter("GaussianBlur", parseInt(e.target.value, 10))}
            />

            {/* Color & Lighting: Continuous floats around a neutral 1.0 baseline */}
            <Slider 
                 label="Exposure" 
                 min={0} max={3} step={0.1} defaultValue={1}
                onCommit={(e) => applyFilter("Exposure", parseFloat(e.target.value))}
            />
            <Slider 
                 label="Contrast" 
                 min={0} max={3} step={0.1} defaultValue={1}
                onCommit={(e) => applyFilter("Contrast", parseFloat(e.target.value))}
            />
            <Slider 
                 label="Saturation" 
                 min={0} max={3} step={0.1} defaultValue={1}
                onCommit={(e) => applyFilter("Saturation", parseFloat(e.target.value))}
            />
            <Slider 
                 label="Gamma Correction" 
                 min={0.1} max={3} step={0.1} defaultValue={1}
                onCommit={(e) => console.log("Gamma Correction not yet implemented in C++")}
            />

            {/* Parameterless Operations: Replaced Sliders with Active/Inactive Buttons */}
            

            {/* Noise Operations */}
            <Slider 
                 label="Gaussian Noise" 
                 min={0} max={100} step={1} defaultValue={10}
                onCommit={(e) => applyFilter("GaussianNoise", 0.0, parseFloat(e.target.value))}
            />
            <Slider 
                 label="Salt-and-Pepper" 
                 min={0} max={0.5} step={0.01} defaultValue={0.05}
                onCommit={(e) => applyFilter("SaltAndPepper", parseFloat(e.target.value))}
            />

            {/* Canny Edge: Gradient threshold scaling */}
            <Slider 
                 label="Canny Edge Detection" 
                 min={10} max={200} step={5} defaultValue={50}
                onCommit={(e) => {
                    const highThresh = parseFloat(e.target.value);
                    const lowThresh = highThresh * 0.4;
                    applyFilter("CannyEdge", lowThresh, highThresh);
                }} 
            />

            <ActiveInactiveBtn 
                 label="Histogram Equalization" 
                onActivate={() => applyFilter("HistogramEqualization")}
                onDeactivate={() => undo && undo()}
            />
            <ActiveInactiveBtn 
                 label="Laplacian" 
                onActivate={() => applyFilter("Laplacian")}
                onDeactivate={() => undo && undo()}
            />
            <ActiveInactiveBtn 
                 label="Sharpening (Unsharp Masking)" 
                onActivate={() => applyFilter("Sharpening")}
                onDeactivate={() => undo && undo()}
            />
        </>
    );
}

export default Filters;