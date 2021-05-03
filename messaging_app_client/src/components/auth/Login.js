// src/components/auth/Login.js
// CSE 330 Creative Project
// Shane Canfield and Laura Bucchieri

// Acknowledgements to https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82

import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";


// Styling
import styled, { keyframes } from 'styled-components';
import { pulse, slideInLeft } from 'react-animations';

const SlideAnimation = keyframes`${slideInLeft}`;
const SlideDiv = styled.div`
  animation: 1 0.2s ${SlideAnimation};
`;


class Login extends Component {
	constructor() {
		super();
		this.state = {
		  username: "",
		  password: "",
		};
	}
	
	componentDidMount() {
		if (this.props.auth.isAuthenticated) { //redirect them to dashboard if logged in
		  this.props.history.push("/dashboard");
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/dashboard"); // push user to dashboard when they login
		}
	}
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	
	onSubmit = e => {
		e.preventDefault();
		const userData = {
		  username: this.state.username,
		  password: this.state.password
		};
	
		this.props.loginUser(userData);
	};
	render() {
		return (
			
			  <div style={{ height: "100vh" }} className="container valign-wrapper">
			  <SlideDiv>
				<div className="row">
				  <div className="col center-align">
					<Link to="/" className="btn btn-small blue">
					  Back
				    </Link>
					<div className="col s12">
					  <h4>
						<b>Login</b>
					  </h4>
					</div>
					<form noValidate onSubmit={this.onSubmit}>
					<div className="input-field col s12">
					Username:
					  <input
						onChange={this.onChange}
						value={this.state.username}
						id="username"
						type="text"
					  />
					</div>
					  <div className="input-field col s12">
						Password:
						<input
						  onChange={this.onChange}
						  value={this.state.password}
						  id="password"
						  type="password"
						/>
					  </div>
					  <div className="col s12">
						<button
						  type="submit"
						  className="btn btn-large blue"
						>
						  Login
						</button>
					  </div>
					</form>
				  </div>
				</div>
				</SlideDiv>
			  </div>
		 
		);
	}
}
	
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
