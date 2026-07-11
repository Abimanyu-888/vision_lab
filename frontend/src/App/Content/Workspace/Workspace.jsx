import ControlPanel from './Control-panel/ControlPanel.jsx'
import Image from './image/Image.jsx'
import styles from './workspace.module.css'

function Workspace(){
    return(
        <div className={styles.workspace}>
            <Image/>
            <ControlPanel/>
        </div>
    )
}

export default Workspace