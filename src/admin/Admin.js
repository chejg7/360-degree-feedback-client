import React from 'react';
import { Route, Link, BrowserRouter as Router} from 'react-router-dom';
import ProjectList from './ProjectList';
import CreateProject from './CreateProject';
import CreateSurvey from './CreateSurvey';
import MatchingUsers from './MatchingUsers';
import ProjectDetail from './ProjectDetail';

function Admin ({user}) {
    console.log(user);
    return (
        <>
        <Router>
            <Route exact path='/admin/create-project' component={CreateProject} />
            <Route exact path='/admin/create-survey' component={CreateSurvey} />
            <Route exact path='/admin/matching-users' component={MatchingUsers} />
            <Route exact path='/admin/project' component={ProjectDetail} />
            <Route exact path='/admin' component={ProjectList} />
        </Router>
        </>
    )
}

export default Admin;