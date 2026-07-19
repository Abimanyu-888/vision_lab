import Slider from "../design/Slider.jsx"
function RecognizeNum(){
    return(
    <>
        <Slider label="Confidence Threshold" onCommit={()=>{return 0}} />

    </>
    )
}

export default RecognizeNum