import styles from './nav.module.css'
function NavItems(props){

    return(
        <div className={styles.nav_item_wrapper}>
            <button className={`${styles.nav_btn} ${props.btn_color} ${props.active && styles.active_color}`}>
                <img src={props.thelogo}/>
            </button>
            <span className={`${styles.tooltip} ${props.txt_color}`}>{props.name}</span>
        </div>
    )
}
export default NavItems