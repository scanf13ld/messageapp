// src/App.js
//CSE 330 Creative Project
//Shane Canfield and Laura Bucchieri

import logo from './logo.svg';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Tying in authentication
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//CSS
import './App.css';

//Redux
import { Provider } from "react-redux";
import store from "./store";


//Components
import NewMessage from './components/NewMessage';
import NewConversation from './components/NewConversation';
import Dashboard from './components/Dashboard';
import ShowMessageList from './components/ShowMessageList';
import ShowConversationList from './components/ShowConversationList';
import GetMessage from './components/GetMessage';
import Home from './components/Home';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import NewGroup from './components/NewGroup';
import ShowGroupList from './components/ShowGroupList';


import PrivateRoute from "./components/private-route/PrivateRoute";


// check for token to keep user logged in
if (localStorage.jwtToken) {
  
  const token = localStorage.jwtToken; // set auth token header auth
  setAuthToken(token);
  
  const decoded = jwt_decode(token); // decode token and get user info and exp
  
  store.dispatch(setCurrentUser(decoded)); // set user and isAuthenticated

  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) { // check for expired token
    
    store.dispatch(logoutUser()); // logout user
    
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
	<Provider store={store}>
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path='/show-message-list/:id' component={ShowMessageList} />
          <Route exact path='/new-message' component={NewMessage} />
          <Route exact path='/get-message/:id' component={GetMessage} />
		  <Route exact path='/new-conversation' component={NewConversation} />
		  <Route exact path='/show-conversation-list' component={ShowConversationList} />
		  
		  <Route exact path='/new-group' component={NewGroup} />
		  <Route exact path='/show-group-list' component={ShowGroupList} />
		  
		  
		  <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
		   </Switch>
        </div>
      </Router>
	  </Provider>
    );
  }

}

export default App;
