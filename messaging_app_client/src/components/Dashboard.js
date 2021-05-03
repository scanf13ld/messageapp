// src/components/Dashboard.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import ShowConversationList from './ShowConversationList';
import ShowGroupList from './ShowGroupList';



import styled, { keyframes } from 'styled-components';
import { pulse, slideInLeft } from 'react-animations';

const BounceAnimation = keyframes`${pulse}`;
const BounceDiv = styled.div`
  animation: infinite 10s ${BounceAnimation};
`;

const SlideAnimation = keyframes`${slideInLeft}`;
const SlideDiv = styled.div`
  animation: 1 0.2s ${SlideAnimation};
`;

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
		<div>
		<SlideDiv>
		  <div style={{ height: "100vh" }} className="container valign-wrapper">
			<div className="row">
			  <div className="col s12 center-align">
			  
				<h4>
				  <b>Welcome,</b> {user.name.split(" ")[0]}!
				</h4>
				
				<div className="row">
					<div className="col-md-12">
					
					<h2 className="display-4 text-center">Conversations</h2>
					</div>

				</div>
				<div className="col s12 center-align">
					<BounceDiv>
					<ShowConversationList username={user.username}/>
					
					<ShowGroupList username={user.username}/>
					</BounceDiv>
				</div>
				
				<Link to="/new-conversation" className="btn btn-large light-blue">
					  Start a conversation
				</Link><br/><br/>
				
				<Link to="/new-group" className="btn btn-large light-blue">
					  Create a group
				</Link><br/><br/>
				
				<button
				  onClick={this.onLogoutClick}
				  className="btn btn-large indigo"
				>
				  Logout
				</button>
			  </div>
			</div>
		  </div>
		  </SlideDiv>
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