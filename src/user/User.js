import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User ({user}) {
    console.log(user);

    const [project, setProject] = useState();

    useEffect(async () => {
        console.log(user)
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