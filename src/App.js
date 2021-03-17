import React, { useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import Admin from './Admin';
import Manager from './Manager';
import User from './User';



function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  }

  if (!isLoggedIn) {
    return <Login handleLogin={handleLogin}/>
  } else {
    switch (user.role) {
      case 'admin': 
        return <Admin user={user}/>;
      case 'manager':
        return <Manager user={user}/>;
      case 'user':
        return <User user={user} />;
    }
  }
  // return (
  //   <div className="App">
  //     <Router>
  //       <Route exact path="/" component={Login} />
  //       <Route path="/admin" component={Admin} /> 
  //       <Route path="/manager" component={Manager} />
  //       <Route path="/user/:id" component={User} />
  //     </Router>
  //   </div>
  // );
}

export default App;
