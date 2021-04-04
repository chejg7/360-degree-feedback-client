import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';

function Login (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await axios.post('http://localhost:4000/login', {
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

    const handleTestLogin = async () => {
        await axios.post('http://localhost:4000/login', {
            email: 'chejg7@gmail.com',
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
                <div>또는</div>
                <div>
                    <button onClick={handleTestLogin}>관리자 계정 테스트</button>
                </div>
                <div>
                    <button>유저 계정 테스트</button>
                </div>
            </form>
        </div>
        </div>
    </div>)
}

export default Login;