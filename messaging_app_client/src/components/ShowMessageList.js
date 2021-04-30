import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MessageBubble from './MessageBubble';
import NewMessage from './NewMessage';

import PropTypes from "prop-types";
import { connect } from "react-redux";

class ShowMessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  
  

  componentDidMount() {
	const { user } = this.props.auth;
	console.log(user.username);
	var request = {
		params: {
			user1: user.username
		}
	}
	console.log(request);
    axios
      .get('http://localhost:8082/api/messages/'+this.props.match.params.id, request)
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
	const { user } = this.props.auth;
	const user2 = this.props.location.state.user2;
	const encrypted = this.props.location.state.encrypted;
    const messages = this.state.messages;
    console.log("PrintMessage: " + messages);
    let messageList;
	const conv_id = this.props.match.params.id;
	
    if(!messages) {
      messageList = "there is no message record!";
    } else {
	  console.log("not false");
      messageList = messages.map((message, k) =>
        <MessageBubble encrypted={encrypted} user1={user.username} user2= {user2} message={message} key={k} />
      );
    }
	
    return (
	
      <div className="container valign-wrapper">
	  
        <div className="container">
		
          <div className="row">
		  
            <div className="col s12">
			<br/>
			<Link to="/dashboard" className="btn btn-small waves-effect waves-light hoverable blue accent-3">
                  Back
		    </Link>
              <h2 className="display-4 text-center">{user2}</h2>
			 
			  
            </div>
          </div>
		  
		  

          <div className="col s12 center-align">
                {messageList}
          </div>
		  
		  
		  <div className="col s12 center-align">
			<NewMessage encrypted={encrypted} user1={user.username} user2={user2}  conv_id={conv_id}/>
              <br />
              <br />
              <hr />
            </div>
			
        </div>
      </div>
    );
  }
}

ShowMessageList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { }
)(ShowMessageList);

//export default ShowMessageList;
