import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';




const GroupSlide = (props) => {
	const group = props.group;
	const name = props.name;
	
	console.log(group.group_id);
	

    return(
	<React.Fragment>
			<span className="close-convo" onClick={props.onDeleteClick.bind(this,group.group_id)}>
				<i className="fa fa-times-circle"></i>
			</span>
			<div className="card">
				<Link to={{
					pathname: `/show-message-list/${group.group_id}`,
					state: {
						groupname: name,
						
					}
				}}>
					<div className="card-body">
						<div className="center-align">
							<h5 className="convo-name">{name}</h5>
								<span><i className="fa fa-users"></i></span>
								
						</div>
					</div>
				</Link>
				
			</div>
	</React.Fragment>
    )
};


export default GroupSlide;
