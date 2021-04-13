import React from 'react';
import axios from 'axios';
import styles from './LoginBar.module.css';

function LoginBar (props) {
    const { user, handleLogout } = props;

    return <div className={styles.wrapper}>
        <div className={styles.container}>
            <div>360도 다면평가</div>
            <div className={styles.user}>
                <div>{user.name} 님</div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
}

export default LoginBar;