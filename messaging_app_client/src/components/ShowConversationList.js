// src/components/ShowConversationList.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ConversationSlide from './ConversationSlide';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ShowConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
	
	this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  
  
  onDeleteClick(id) {
	
	
	console.log("Clicked");
	
	axios.all
	([
		axios
		  .delete('http://localhost:8082/api/messages/conversation/'+id)
		  .then(res => {
			this.props.history.push("/");
		  })
		  .catch(err => {
			console.log("Error form ShowConversationList_deleteClick");
			
		}),
		axios
		  .delete('http://localhost:8082/api/messages/conversation/messages/'+id)
		  .then(res => {
			this.props.history.push("/");
		  })
		  .catch(err => {
			console.log("Error form ShowConversationList_deleteClick");
			
		}),
		
	]).then(axios.spread((data1, data2) => {
	// output of req.
	console.log('data1', data1, 'data2', data2)
	}));
	window.location.reload();

  };  

  componentDidMount() {
	const { user } = this.props.auth; 
	//console.log(this.props.match.params.id);
	var request = {
		params: {
			user1: user.username
		}
	}
    axios
      .get('http://localhost:8082/api/messages/conversations/'+user.username, request)
      .then(res => {
        this.setState({
          conversations: res.data,
		  
        })
      })
      .catch(err =>{
        console.log('Error from ShowConversationList');
      })
  };
	


  render() {
	const { user } = this.props.auth; 
	let fn = this.onDeleteClick;
    const conversations = this.state.conversations;
    console.log("Print Conversations: " + conversations);
    let conversationList;
	//console.log("User: "+user.username);
    if(!conversations) {
      conversationList = "there is no conversations record!";
    } else {
	  if (conversations.length > 0){
		    
		  	conversationList = conversations.map(function(conversation, k){
			let user2;
			if (user.username === conversation.user2){
				console.log(conversation.user1);
				user2 = conversation.user1;
			} else {
				user2 = conversation.user2;
			}
			
			return <ConversationSlide onDeleteClick={fn} encrypted={conversation.encrypted} user1={user.username} user2={user2} conversation={conversation} key={k}  />
			});
	  }
	  
      
    }

    return (
        <div>
          

          <div className="row">
                {conversationList}
          </div>
        </div>
      
    );
  }
}

ShowConversationList.propTypes = {

  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {  }
)(ShowConversationList);

//export default ShowConversationList;
