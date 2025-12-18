import styles from './btn.module.css'
function Btn(props){
    return(
        <button className={styles.upload_btn}>
            <img src={props.logo}/>
            <span>{props.info}</span>
        </button>
    )
}
export default Btn