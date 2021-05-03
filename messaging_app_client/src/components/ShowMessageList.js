// src/components/ShowMessageList.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MessageBubble from './MessageBubble';
import NewMessage from './NewMessage';
import NewGroupMessage from './NewGroupMessage';

import EditGroupUtility from './EditGroupUtility';

import PropTypes from "prop-types";
import { connect } from "react-redux";

import styled, { keyframes } from 'styled-components';
import { slideInRight } from 'react-animations';

const SlideAnimation = keyframes`${slideInRight}`;
const SlideDiv = styled.div`
  animation: 1 0.2s ${SlideAnimation};
`;

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
	
	const groupname = this.props.location.state.groupname;
	
	console.log("Params.id: " +this.props.match.params.id);
	
	
	if (groupname == null){
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
	} else{
		axios
		  .get('http://localhost:8082/api/messages/groupmessages/'+this.props.match.params.id, request)
		  .then(res => {
			this.setState({
			  messages: res.data
			})
			console.log("Axios messages: "+this.state.messages);
		  })
		  .catch(err =>{
			console.log('Error from ShowMessageList');
		  })
		
		
	}
  };
  

  render() {
	console.log("Name: " +this.props.location.state.groupname);
	const { user } = this.props.auth;
	console.log("Location.state: "+this.props.location.state);
	const groupname = this.props.location.state.groupname;
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
	  console.log("Messages:"+messages);
	  
	  if (groupname == null){
		  messageList = messages.map((message, k) =>
			<MessageBubble encrypted={encrypted} user1={user.username} user2= {user2} message={message} key={k} />
			);
	  } else{
		  messageList = messages.map((message, k) =>
		  <MessageBubble groupname={groupname} user1={user.username} from={message.from} message={message} key={k} />
		  );
	  }
	  console.log(messageList);
      
    }
	
    return (
	<div>
		
	
		  <div className="container valign-wrapper">
		  
			<div className="container">
			
			  <div className="row">
			  
				<div className="col s12">
				<br/>
				<Link to="/dashboard" className="btn btn-small blue">
					  Back
				</Link>
				
				{ groupname != null ? (
					<React.Fragment>
					<h2 className="display-4 text-center">{groupname}</h2>
					<EditGroupUtility groupname= {groupname} group_id={conv_id}/> <br/>
					</React.Fragment>
					):(
					<h2 className="display-4 text-center">{user2}</h2>
				 )}
				 
				  
				</div>
			  </div>
			  <hr />
			  
			  

			  <div className="col s12 center-align">
					{messageList}
			  </div>
			  
			  
			  <div className="col s12 center-align">
			  
			  { groupname != null ? (
				 <NewGroupMessage encrypted={encrypted} from={user.username} group_id={conv_id}/>  
					):(
				 <NewMessage encrypted={encrypted} user1={user.username} user2={user2}  conv_id={conv_id}/>
					)}
			 
				
				  <br />
				  <br />
				  
				</div>
				
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
