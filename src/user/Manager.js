import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Manager ({user}) {
    console.log(user);

    const [project, setProject] = useState();

    useEffect(async () => {
        console.log(user)
        const result = await axios.post(process.env.REACT_APP_URL + '/users/project', {
            email: user.email,
            projectTitle: user.projectTitle
        });
        console.log(result);
    },[]);

    return <>
        <div>Manager</div>
    </>

}

export default Manager;