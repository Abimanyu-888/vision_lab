import { useState } from 'react';
import styles from './ActiveInactiveBtn.module.css';

function ActiveInactiveBtn({ label, onCommit }) {

    const handleClick = () => {
        onCommit();
    };

    return (
        <div className={styles.btn_group} >
            <button style={{ textAlign: "center" }}
                className={`${styles.toggle_btn}`}
                onClick={handleClick}
            >
                <span className={styles.label_text} style={{ textAlign: "center" }}>{label}</span>
            </button>
        </div>
    );
}

export default ActiveInactiveBtn;
