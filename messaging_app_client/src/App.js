import logo from './logo.svg';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import NewMessage from './components/NewMessage';
import ShowConversationList from './components/ShowConversationList';
import ShowMessageList from './components/ShowMessageList';
import GetMessage from './components/GetMessage';
import Home from './components/Home';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path='/show-message-list' component={ShowMessageList} />
          <Route exact path='/new-message' component={NewMessage} />
          <Route exact path='/get-message/:id' component={GetMessage} />
        </div>
      </Router>
    );
  }

}

export default App;
