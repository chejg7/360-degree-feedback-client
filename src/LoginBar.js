import React from 'react';
import axios from 'axios';
import styles from './LoginBar.module.css';

function LoginBar ({user}) {
    const handleLogout = async () => {
        axios.post("http://localhost:4000/signout")
        .then((res) => {
            this.setState({ userinfo: null, isLogin: false });
            this.props.history.push('/');
        })
    }

    return <div className={styles.wrapper}>
        <div className={styles.container}>
            <div>360도 다면평가</div>
            <div className={styles.user}>
                <div>{user.name} 님</div>
                <button>Logout</button>
            </div>
        </div>
    </div>
}

export default LoginBar;