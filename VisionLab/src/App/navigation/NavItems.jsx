function NavItems(props){

    return(
        <div className="nav-item-wrapper">
            <button className={`nav-btn ${props.btn_color} ${props.active && "active"}`}>
                <img src={props.thelogo}/>
            </button>
            <span className={`tooltip ${props.txt_color}`}>{props.name}</span>
        </div>
    )
}
export default NavItems