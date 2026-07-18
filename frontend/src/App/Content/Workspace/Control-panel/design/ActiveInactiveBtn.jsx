import { useState } from 'react';
import styles from './ActiveInactiveBtn.module.css';

function ActiveInactiveBtn({ label, onActivate, onDeactivate }) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        if (!isActive) {
            setIsActive(true);
            if (onActivate) onActivate();
        } else {
            setIsActive(false);
            if (onDeactivate) onDeactivate();
        }
    };

    return (
        <div className={styles.btn_group}>
            <button 
                className={`${styles.toggle_btn} ${isActive ? styles.active : ''}`}
                onClick={handleClick}
            >
                <span className={styles.label_text}>{label}</span>
                <div className={`${styles.status_badge} ${isActive ? styles.badge_active : ''}`}>
                    <span className={styles.dot}></span>
                    <span className={styles.status_text}>{isActive ? "ACTIVE" : "INACTIVE"}</span>
                </div>
            </button>
        </div>
    );
}

export default ActiveInactiveBtn;
