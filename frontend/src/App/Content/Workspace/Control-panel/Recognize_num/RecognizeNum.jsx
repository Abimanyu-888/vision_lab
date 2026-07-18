import Slider from "../design/slider.jsx"
function RecognizeNum(){
    return(
    <>
        <Slider label="Confidence Threshold" onCommit={()=>{return 0}} />

    </>
    )
}

export default RecognizeNum