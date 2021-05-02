// src/components/ShowConversation.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MessageBubble from './MessageBubble';

class ShowConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/conversation/query')
      .then(res => {
        this.setState({
          messages: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowMessageList');
      })
  };


  render() {
    const messages = this.state.messages;
    console.log("PrintMessage: " + messages);
    let messageList;

    if(!messages) {
      messageList = "there is no message record!";
    } else {
      messageList = messages.map((message, k) =>
        <MessageBubble message={message} key={k} />
      );
    }

    return (
      <div className="ShowMessageList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br/>
              <h2 className="display-4 text-center">Messages List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/new-message" className="btn btn-outline-warning float-right">
                + Add New Message
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {messageList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowConversation;
