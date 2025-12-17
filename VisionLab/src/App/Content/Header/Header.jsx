import './header.css'

import Login_btn from './login_btn/login_btn.jsx';
import ProfileBtn from './profile_btn/ProfileBtn.jsx';
function Header(){
    return(
        <header>
            <div>
                <h1 className="font-mono">
                    VISION<span className="text-neon-blue">Lab</span>
                </h1>
                <p className="subtitle font-mono">IMAGE PROCESSING UNIT</p>
            </div>

            <div className="header-actions">
                <Login_btn/>
                <ProfileBtn/>
            </div>
        </header>
    )
}

export default Header