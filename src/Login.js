import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setError(null);
                setUsers(null);
                setLoading(true);
                const response = await axios.get('http://localhost:4000/login');
                setUsers(response.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    if (loading) return <div>유저 데이터를 읽어오는 중입니다...</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!user) return null;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        const user = users.find(
            (user) => user.email === email && user.password === password
        );
        if (user === undefined) {
            alert('등록된 유저가 아닙니다')
        }

        props.handleLogin(user);
    }

    return <div>
        <form onSubmit={onSubmit}>
            <label>이메일 : 
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    required 
                    value={email} 
                    onChange={onChange} />
            </label>
            <label>비밀번호 : 
                <input 
                    name="password" 
                    type="password" 
                    placeholder="password" 
                    required 
                    value={password} 
                    onChange={onChange} />
            </label>
            <input type="submit" value="로그인"/>
        </form>
    </div>
}

export default Login;