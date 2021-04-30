import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import ShowConversationList from './ShowConversationList';

class Dashboard extends Component {
	
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};
	
	render() {
	console.log(this.props.auth);
    const { user } = this.props.auth;
	console.log(user);
	return (
		  <div style={{ height: "75vh" }} className="container valign-wrapper">
			<div className="row">
			  <div className="col s12 center-align">
				<h4>
				  <b>Hey there,</b> {user.name.split(" ")[0]}!
				</h4>
				<br/>
				
				<ShowConversationList username={user.username}/>
				
				<Link to="/new-conversation" className="btn btn-large waves-effect waves-light hoverable light-blue accent-3">
					  Start a conversation
				</Link><br/>
				
				<button
				  style={{
					width: "150px",
					borderRadius: "3px",
					letterSpacing: "1.5px",
					marginTop: "1rem"
				  }}
				  onClick={this.onLogoutClick}
				  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
				>
				  Logout
				</button>
			  </div>
			</div>
		  </div>
	  );
	}
}
	
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);