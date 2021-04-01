import React, { useState } from 'react';
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

    return <div>
        <h1>360-degree Feedback</h1>
        <form onSubmit={onSubmit}>
            <div>
                <label>이메일 : 
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        required 
                        value={email} 
                        onChange={onChange} />
                </label>
            </div>
            <div>
                <label>비밀번호 : 
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="password" 
                        required 
                        value={password} 
                        onChange={onChange} />
                </label>
            </div>
            <div>
                <input type="submit" value="로그인"/>
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
}

export default Login;