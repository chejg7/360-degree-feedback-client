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
            <h1>Admin</h1>
            <Link to='/admin/create-project'><button>프로젝트 등록</button></Link>
            <Link to='/admin/create-survey'><button>진단 등록</button></Link>
            <Link to='/admin/matching-users'><button>진단자 매칭</button></Link>
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