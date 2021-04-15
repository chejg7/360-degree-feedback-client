import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';

function Login (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await axios.post(process.env.REACT_APP_URL + '/login', {
            email: email,
            password: password
        })
        .then((res) => {
            props.handleResponseSuccess(res.data);
        })
        .catch((err) => alert(err));
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    }

    const handleAdminTestLogin = async () => {
        await axios.post('http://ec2-3-35-210-192.ap-northeast-2.compute.amazonaws.com:3000/login', {
            email: 'admin@test.com',
            password: 'cmoecodestates2021'
        })
        .then((res) => {
            console.log('받아온 유저 데이터', res.data);
            props.handleResponseSuccess(res.data);
        })
        .catch((err) => alert(err));
    }

    const handleUserTestLogin = async () => {
        await axios.post('http://ec2-3-35-210-192.ap-northeast-2.compute.amazonaws.com:3000/login', {
            email: 'AITASKIM@shinhan.com',
            password: 'cmoe2021'
        })
        .then((res) => {
            props.handleResponseSuccess(res.data);
        })
        .catch((err) => alert(err));
    }

    return (<div className={styles.container}>
        <h1>360도 다면평가</h1>
        <div className={styles.wrapper}>
            <img 
                src="undraw_anonymous_feedback_y3co.svg" />
            <div className={styles.loginForm}>
            <form onSubmit={onSubmit}>
                <div className={styles.inputArea}>
                    <h3>로그인</h3>
                    <label>Email</label>
                        <input 
                            name="email" 
                            type="email" 
                            required 
                            value={email} 
                            onChange={onChange} 
                        />
                    <label>Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            required 
                            value={password} 
                            onChange={onChange}
                        />
                    <button>로그인</button>
                    </div>
                <div className={styles.caption}>
                    <div>또는</div>
                    <button onClick={handleAdminTestLogin}>관리자 계정 테스트</button>
                    <button onClick={handleUserTestLogin}>유저 계정 테스트</button>
                </div>
            </form>
        </div>
        </div>
    </div>)
}

export default Login;