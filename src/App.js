import React, { useState, useEffect } from 'react';
import { Route, Redirect, useHistory, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import Admin from './Admin';
import Manager from './Manager';
import User from './User';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleResponseSuccess = (userInfo) => {
    setUser(userInfo);
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
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
      <Router>
      <Route
          path='/'
          render={() => {
            if (!isLoggedIn) {
              return <Redirect to='/login' />
            } else {
              switch (user.role) {
                case 'admin': 
                  return <Redirect to='/admin' />
                case 'manager':
                  return <Redirect to='/manager' />
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
            <Admin user={user} handleLogout={handleLogout} />
          )}
        />
        <Route
          exact path='/manager'
          render={() => (
            <Manager user={user} handleLogout={handleLogout} />
          )}
        />
        <Route
          exact path='/user'
          render={() => (
            <User user={user} handleLogout={handleLogout} />
          )}
        />
      </Router>
    </div>
  );
}

export default App;
