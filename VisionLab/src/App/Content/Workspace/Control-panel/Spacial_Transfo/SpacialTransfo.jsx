import Slider from "../Slider/Slider"
function SpacialTransfo(){
    return(
    <>
        <Slider label="Perspective X" onCommit={()=>{return 0}} />
        <Slider label="Perspective Y" onCommit={()=>{return 0}} />
        <Slider label="Scale" onCommit={()=>{return 0}} />

    </>
    )
}

export default SpacialTransfo