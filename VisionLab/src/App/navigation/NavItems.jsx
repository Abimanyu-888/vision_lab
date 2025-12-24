import styles from './nav.module.css'
import { useFeature } from '../../feature_contest'
function NavItems(props){
    const {setFeature}=useFeature()
    const handleClick=()=>{
        setFeature(props.FeatureNo)
    }

    return(
        <div className={styles.nav_item_wrapper}>
            <button className={`${styles.nav_btn} ${props.btn_color} ${props.active && styles.active_color}`} onClick={handleClick}>
                <img src={props.thelogo}/>
            </button>
            <span className={`${styles.tooltip} ${props.txt_color}`}>{props.name}</span>
        </div>
    )
}
export default NavItems