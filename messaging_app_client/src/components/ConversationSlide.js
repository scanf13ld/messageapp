// src/components/ConversationSlide.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


const ConversationSlide = (props) => {
    const conversation  = props.conversation;
	const user1 = props.user1;
	const user2 = props.user2;

    return(
		
			
			<React.Fragment>
			<span className="close-convo" onClick={props.onDeleteClick.bind(this,conversation._id)}>
				<i className="fa fa-times-circle"></i>
			</span>
			
			<div className="card">
				<Link className="bubble" to={{
					pathname: `/show-message-list/${conversation._id}`,
					
					state: {
						user1: user1,
						user2: user2,
						encrypted: props.conversation.encrypted
					}
				}}>
				<div className="card-body">
					<div className="center-align">
						<h5 className="convo-name">{user2}</h5>
																
							{conversation.encrypted ? (
								<span><i className="fa fa-lock"></i></span>
								) : (
								<span><i className="fa fa-user"></i></span>
							)}
							
							
					</div>
				</div>
				</Link>
			</div>
			</React.Fragment>
		
    )
};


export default ConversationSlide;
