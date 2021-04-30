import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const MessageBubble = (props) => {
    const  message  = props.message;
	const user1 = props.user1;
	const user2 = props.user2;

	if (message.user1 === user1) //Displays different colors for sending/receiving
	{
		console.log("here");
		return(
			<div className="message-div">
				<div className="row message-user1">
					<div className="col">
					  <p className="message">
						<Link to={`/get-message/${message._id}`}>
							{ message.message }
						</Link>
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
				<div className="row message-user2">
					<div className="col">
					  <p className="message">
						<Link to={`/get-message/${message._id}`}>
							{ message.message }
						</Link>
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
