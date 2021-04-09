import React, { useState, useEffect } from 'react';
import { Route, Link, useHistory, BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import SurveyList from './SurveyList';
import Survey from './Survey';

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
        <Router>
            <h1>User</h1>
            <Route exact path='/user/survey' component={Survey} />
            <Route exact path='/user' component={SurveyList} 
                projects={projects}
                user={user}
            />
        </Router>
    </>
}

export default User;