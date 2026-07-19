import Slider from '../design/Slider.jsx';
import ActiveInactiveBtn from '../design/ActiveInactiveBtn.jsx';
import useApplyFilter from '../../applyFiler.jsx';
import { useImage } from '../../../../../image_context.jsx';


function SpacialTransfo(props){
    const { undo } = useImage();
    const applyFilter = useApplyFilter(props.module, props.setProcessing);
    return(
        <>
            <ActiveInactiveBtn 
                    label="FlipHorizontal" 
                    onCommit={() => applyFilter("FlipHorizontal")}
            />
            <ActiveInactiveBtn 
                    label="FlipVertical" 
                    onCommit={() => applyFilter("FlipVertical")}
            />

        </>
    )
}

export default SpacialTransfo;