import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User ({user}) {
    console.log('넘어온 유저 데이터', user);

    const [project, setProject] = useState();

    useEffect(async () => {
        const result = await axios.post('http://localhost:4000/users/project', {
            email: user.email,
            projectTitle: user.projectTitle
        });
        console.log(result);
    },[]);

    return <>
        <h1>User</h1>
    </>
}

export default User;