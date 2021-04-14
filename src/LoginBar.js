import React from 'react';
import { FcSurvey } from 'react-icons/fc';
import { AiOutlineUser } from 'react-icons/ai';
import axios from 'axios';
import styles from './LoginBar.module.css';

function LoginBar (props) {
    const { user, handleLogout } = props;

    return <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.title}>
                <FcSurvey size={20} />
                <div>360도 다면평가</div>
            </div>
            <div className={styles.user}>
                <div><AiOutlineUser />  {user.name} 님</div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
}

export default LoginBar;