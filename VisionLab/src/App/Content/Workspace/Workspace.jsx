import ControlPanel from './Control-panel/ControlPanel.jsx'
import Image from './image/Image.jsx'
import './workspace.css'

function Workspace(){
    return(
        <div className="workspace">
            <Image/>
            <ControlPanel/>
        </div>
    )
}

export default Workspace