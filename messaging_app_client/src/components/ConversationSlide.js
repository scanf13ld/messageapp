import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';




const ConversationSlide = (props) => {
    const conversation  = props.conversation;
	const user1 = props.user1;
	const user2 = props.user2;
	//const encrypted = props.encrypted;

   

    return(
		
			<div className="row">
					<div className="card">
					<Link to={{
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
									<p className="convo-messagepreview"> 
										{conversation.last_msg}
									</p>
									
									{conversation.encrypted ? (
										<span><i className="fa fa-lock"></i></span>
										) : (
										<span><i className="fa fa-user"></i></span>
									)}
									
									
							</div>
						</div>
					</Link>
					
				</div>
			</div>
		
    )
};


export default ConversationSlide;
