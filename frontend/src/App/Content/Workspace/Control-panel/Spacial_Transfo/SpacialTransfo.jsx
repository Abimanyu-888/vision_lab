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
                    onActivate={() => applyFilter("FlipHorizontal")}
                    onDeactivate={() => undo && undo()}
            />
            <ActiveInactiveBtn 
                    label="FlipVertical" 
                    onActivate={() => applyFilter("FlipVertical")}
                    onDeactivate={() => undo && undo()}
            />
            <Slider label="Scale" onCommit={()=>{return 0}} />

        </>
    )
}

export default SpacialTransfo;