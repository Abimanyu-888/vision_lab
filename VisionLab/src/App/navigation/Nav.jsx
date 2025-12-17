import logo from '/src/assets/aperture.svg'
import kernal_logo from '/src/assets/squares-intersect.svg'
import settings_logo from '/src/assets/settings.svg'
import scan_txt_logo from '/src/assets/scan-text.svg'
import filter_logo from '/src/assets/settings-2.svg'
import NavItems from './NavItems.jsx'

import './nav.css'
function Nav() {
    return (
        <nav className="sidebar glass-panel">
            <div className="logo-container">
                <div className="logo-glow"></div>
                <img src={logo} className="logo-icon" width="32" height="32"/>
            </div>

            <div className="nav-group">
                <NavItems btn_color="btn-blue" active={false} thelogo={scan_txt_logo} txt_color="text-neon-blue" name="Recognize Num" />
                <NavItems btn_color="btn-purple" active={true} thelogo={filter_logo} txt_color="text-neon-purple" name="Filters" />
                <NavItems btn_color="btn-mint" active={false} thelogo={kernal_logo} txt_color="text-neon-mint" name="Spatial Transform" />
            </div>

            <button className="settings-btn">
                <img src={settings_logo}/>
            </button>
        </nav>
    );
}

export default Nav; 