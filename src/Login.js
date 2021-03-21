import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import Admin from './Admin';

//테스트용 유저 데이터베이스
//실제로는 서버에서 유저 데이터베이스를 읽어옴(현재 진행 중인 진단 유저 데이터 & 마스터 데이터)
//admin - 관리자 정보 { email, name, password }
//진단 참여자 정보 { email, name, password, surveyName, company, authority, mobile, surveyInfo, answer }
// const users = [
//         { email: "admin@test.com", password: "123", name: "Kim", role: "admin" },
//         { email: "manager@test.com", password: "123", name: "Lee", role: "manager" },
//         { email: "user@test.com", password: "123", name: "Park", role: "user" },
//     ]

function Login (props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

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

    return <div>
        <h1>CMOE 360-degree Feedback</h1>
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
        </form>
    </div>
}

export default Login;