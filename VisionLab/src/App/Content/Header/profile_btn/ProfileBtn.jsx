import './profilebtn.css'
function ProfileBtn(){
    return(
        <div className="avatar-ring">
            <div className="avatar-inner">
                <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="User" className="avatar-img" />
            </div>
        </div>
    )
}
export default ProfileBtn