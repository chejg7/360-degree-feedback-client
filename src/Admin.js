import React from 'react';
import { Route, Link, BrowserRouter as Router} from 'react-router-dom';
import SurveyList from './SurveyList';
import CreateProject from './CreateProject';
import CreateSurvey from './CreateSurvey';

function Admin ({user}) {
    console.log(user);
    return (
        <>
        <Router>
            <h1>Admin</h1>
            <Link to='/create-project'><button>프로젝트 등록</button></Link>
            <Link to='/create-survey'><button>진단 등록</button></Link>
            <Route path='/create-project' component={CreateProject} />
            <Route path='/create-survey' component={CreateSurvey} />
            <Route path='/admin' component={SurveyList} />
        </Router>
        </>
    )
}

export default Admin;