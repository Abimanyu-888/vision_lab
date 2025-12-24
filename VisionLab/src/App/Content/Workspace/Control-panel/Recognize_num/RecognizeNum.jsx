import Slider from "../Slider/Slider"
function RecognizeNum(){
    return(
    <>
        <Slider label="Confidence Threshold" onCommit={()=>{return 0}} />

    </>
    )
}

export default RecognizeNum