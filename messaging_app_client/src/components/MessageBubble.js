import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

var aes256 = require("aes256");

var key = "ouhpr2h39hpawdnloi1h2neddwqd12";

const DoDecrypt = (cipher) => {
 
  var decrypted = aes256.decrypt(key, cipher);
  return decrypted;
};


const MessageBubble = (props) => {
    const  message  = props.message;
	const user1 = props.user1;
	const user2 = props.user2;
	const encrypted = props.encrypted;
	const group = props.groupname;
	const from_id = props.from;
	
	console.log(from_id);
	
	console.log(group);
	let test;
	if (group){
		test = message.from;
	} else {
		test = message.user1;
	}

	if (test === user1) //Displays different colors for sending/receiving
	{
		console.log("here");
		return(
			<div className="message-div">
			
				<div className="row message-user1">
					<div className="col">
					  <p className="message">
						
							{ encrypted ? (
								 DoDecrypt(message.message)  ):(
								 message.message
							 )}
						
					</p>
					</div>
				</div>
			<br/>
			<br/>
			</div>
		)
    } 
	else {
		console.log("no here");
		return(
			<div className="message-div">
			{ group ? (
			<div><p className="groupmsg_id">{from_id}</p><br/></div> ):(<p></p>)}
				<div className="row message-user2">
					<div className="col">
					  <p className="message">
						
							{ encrypted ? (
								 DoDecrypt(message.message)  ):(
								 message.message
							 )}
						
					</p>
					</div>
				</div>
			<br/>
			<br/>
			</div>
		)
	}
    
};

export default MessageBubble;

//<Link to={`/get-message/${message._id}`}>
//</Link>
