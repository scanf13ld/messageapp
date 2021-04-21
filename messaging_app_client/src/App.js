import logo from './logo.svg';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import NewMessage from './components/NewMessage';
import ShowConversationList from './components/ShowConversationList';
import ShowMessageList from './components/ShowMessageList';
import GetMessage from './components/GetMessage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={ShowMessageList} />
          <Route path='/new-message' component={NewMessage} />
          <Route path='/get-message/:id' component={GetMessage} />
        </div>
      </Router>
    );
  }

}

export default App;
