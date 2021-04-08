import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Survey ({project}) {
    console.log('서베이 컴포넌트로 넘어온 데이터', project);
    return <div>
        <h4>{project.projectTitle}</h4>
        <table>
            <thead>
                
            </thead>
        </table>
    </div>
}

function User ({user}) {
    console.log('넘어온 유저 데이터', user);

    const [projects, setProjects] = useState([]);

    useEffect(async () => {
        const result = await axios.post('http://localhost:4000/users/project', {
            email: user.email,
            projectTitle: user.projectTitle
        });
        console.log(result.data);
        setProjects(result.data);
    },[]);

    return <>
        <h1>User</h1>
        <h4>{user.name} 님</h4>
        <div>귀하께서 참여하셔야 하는 진단은 다음과 같습니다</div>
        {projects.map((project, idx) => <Survey key={idx} project={project} />)}
    </>
}

export default User;