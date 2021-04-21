import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const MessageBubble = (props) => {
    const  message  = props.message;

    //if message.user1 == currentUserToken
    

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
        </div>
    )
};

export default MessageBubble;
