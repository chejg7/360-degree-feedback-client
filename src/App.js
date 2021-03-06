import React, { useState, useEffect } from 'react';
import { Route, Redirect, useHistory, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import LoginBar from './LoginBar';
import Admin from './admin/Admin';
import Manager from './user/Manager';
import User from './user/User';

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const handleResponseSuccess = (userInfo) => {
    setUser(userInfo);
  }

  const handleLogout = async () => {
    await axios.post(process.env.REACT_APP_URL + '/logout')
    .then((res) => {
      console.log(res);
      setUser(null);
    });
  }


  // if (!isLoggedIn) {
  //   return <Login handleResponseSuccess={handleResponseSuccess}/>
  // } else {
  //   switch (user.role) {
  //     case 'admin': 
  //       return <Admin path='admin' user={user}/>;
  //     case 'manager':
  //       return <Manager user={user}/>;
  //     case 'user':
  //       return <User user={user} />;
  //   }
  // }

  return (
    <div className="App">
      {user && <LoginBar user={user} handleLogout={handleLogout} />}
      <Router>
      <Route
          path='/'
          render={() => {
            if (!user) {
              return <Redirect to='/login' />
            } else {
              switch (user.role[0]) {
                case 'admin': 
                  return <Redirect to='/admin' />
                case 'manager':
                  return <Redirect to='/user' />
                case 'user':
                  return <Redirect to='/user' />
              }
            }
          }}
        />
        <Route
          exact path='/login'
          render={() => (
            <Login handleResponseSuccess={handleResponseSuccess} />
          )}
        />
        <Route
          exact path='/admin'
          render={() => (
            <Admin user={user} />
          )}
        />
        <Route
          exact path='/manager'
          render={() => (
            <Manager user={user} />
          )}
        />
        <Route
          exact path='/user'
          render={() => (
            <User user={user} />
          )}
        />
      </Router>
    </div>
  );
}

export default App;
