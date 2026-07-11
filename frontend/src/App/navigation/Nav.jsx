import logo from '/src/assets/aperture.svg'
import kernal_logo from '/src/assets/squares-intersect.svg'
import settings_logo from '/src/assets/settings.svg'
import scan_txt_logo from '/src/assets/scan-text.svg'
import filter_logo from '/src/assets/settings-2.svg'
import { useFeature } from '../../feature_contest.jsx'


import NavItems from './NavItems.jsx'

import styles from './nav.module.css'
function Nav() {
    const {currentFeature} =useFeature()

    return (
        <nav className={`${styles.sidebar} ${styles.glass_panel}`}>
            <div className={styles.logo_container}>
                <div className={styles.logo_glow}></div>
                <img src={logo} className={styles.logo_icon} width="32" height="32"/>
            </div>

            <div className={styles.nav_group}>
                <NavItems btn_color={styles.btn_blue} active={currentFeature===1} thelogo={scan_txt_logo} txt_color={styles.text_neon_blue} name="Recognize Num" FeatureNo={1}/>
                <NavItems btn_color={styles.btn_purple} active={currentFeature===2} thelogo={filter_logo} txt_color={styles.text_neon_purple} name="Filters" FeatureNo={2}/>
                <NavItems btn_color={styles.btn_mint} active={currentFeature===3} thelogo={kernal_logo} txt_color={styles.text_neon_mint} name="Spatial Transform" FeatureNo={3}/>
            </div>

            <button className={styles.settings_btn}>
                <img src={settings_logo}/>
            </button>
        </nav>
    );
}

export default Nav; 